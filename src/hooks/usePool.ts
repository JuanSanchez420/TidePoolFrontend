import { useState, useEffect, useContext, useCallback } from "react"
import { useUniswapPoolContract } from "./useContract"
import { Position, Slot0 } from "../info/types"

import {
  FeeAmount,
  maxLiquidityForAmounts,
  nearestUsableTick,
  Pool,
  TickMath,
} from "@uniswap/v3-sdk"
import { Fraction, Token } from "@uniswap/sdk-core"
import useToken from "./useToken"
import { Global } from "../context/GlobalContext"
import { UNISWAPPOOL_ABI } from "../info/abi"
import { multicall } from "@wagmi/core"
import { useIsMounted } from "./useIsMounted"
import { parseUnits, parseEther, encodePacked, keccak256 } from "viem"
import JSBI from "jsbi"

export interface EstimatedPosition {
  wei0: bigint
  wei1: bigint
  depositAmount: number
  fee: number
  volume: number
  share: Fraction
  lower: number
  upper: number
  fees24h: number
  fees30d: number
  fees365d: number
}

const usePool = (address?: string) => {
  const { theList, network, loaded } = useContext(Global)
  const contract = useUniswapPoolContract(address)
  const [pool, setPool] = useState<Pool | undefined>()
  const { tokens } = useToken()
  const isMounted = useIsMounted()

  useEffect(() => {
    const fetch = async () => {
      const p = {
        address: address as `0x${string}`,
        abi: UNISWAPPOOL_ABI,
      }

      const calls = await multicall({
        chainId: network?.chainId,
        contracts: [
          {
            ...p,
            functionName: "slot0",
          },
          {
            ...p,
            functionName: "liquidity",
          },
        ],
      })

      const result = calls[0].result
      const slot0 = result
        ? {
          sqrtPriceX96: result[0],
          tick: result[1],
          observationIndex: result[2],
          observationCardinality: result[3],
          observationCardinalityNext: result[4],
          feeProtocol: result[5],
          unlocked: result[6],
        }
        : {
          sqrtPriceX96: 0n,
          tick: 0,
          observationIndex: 0,
          observationCardinality: 0,
          observationCardinalityNext: 0,
          feeProtocol: 0,
          unlocked: false,
        }
      const liquidity = calls[1].result

      const tidePool = theList.tidePools.find(
        (tp) => tp.poolAddress.toLowerCase() === address?.toLowerCase()
      )

      const token0 = tokens.find(
        (t) =>
          t.address.toLowerCase() ===
          tidePool?.pool.token0.address.toLowerCase()
      )

      const token1 = tokens.find(
        (t) =>
          t.address.toLowerCase() ===
          tidePool?.pool.token1.address.toLowerCase()
      )

      const fee = tidePool?.pool.fee ?? FeeAmount.LOWEST

      setPool(getPool(slot0, fee, liquidity?.toString() || "", token0, token1))
    }
    if (
      isMounted &&
      loaded &&
      address &&
      network &&
      theList.tidePools &&
      tokens.length > 0 &&
      contract
    )
      fetch()
  }, [isMounted, contract, address, network, loaded, tokens, theList])

  const estimateRange = useCallback(() => {
    const tick = pool ? pool.tickCurrent : 0
    const tickSpacing = pool ? pool?.tickSpacing : 10

    const multiplier =
      pool?.tickSpacing === 200 ? 20 : pool?.tickSpacing === 60 ? 30 : 200

    return [
      nearestUsableTick(tick - multiplier * tickSpacing, tickSpacing),
      nearestUsableTick(tick + multiplier * tickSpacing, tickSpacing),
    ]
  }, [pool])

  const getPosition = async (
    owner: string,
    lower: bigint,
    upper: bigint
  ): Promise<Position> => {
    const str = keccak256(
      encodePacked(
        ["address", "int24", "int24"],
        [owner as `0x${string}`, Number(lower), Number(upper)]
      )
    )
    const r = (await contract?.read.positions([str])) as bigint[]

    const position = {
      liquidity: r[0],
      tokensOwed0: r[1],
      tokensOwed1: r[2],
      feeGrowthInside0LastX128: r[3],
      feeGrowthInside1LastX128: r[4],
    } as Position

    return position
  }

  const getPool = (
    slot0: Slot0,
    fee: FeeAmount,
    liquidity: string,
    token0?: Token,
    token1?: Token
  ) => {
    if (!slot0 || !fee || !liquidity || !token0 || !token1) return undefined

    return new Pool(
      token0,
      token1,
      fee,
      slot0.sqrtPriceX96.toString(),
      liquidity.toString(),
      slot0.tick
    )
  }

  const getEstimatedPosition = useCallback(
    (
      ethusd: number,
      token0ETHValue: bigint,
      token1ETHValue: bigint,
      volume: number
    ): EstimatedPosition | null => {
      if (!pool || token0ETHValue === 0n || token1ETHValue === 0n || volume === 0) return null

      const depositAmount = 1000 // USD

      const amountInETH = parseEther(String(depositAmount / 2 / ethusd))

      const wei0 = network.WETH.equals(pool.token0)
        ? amountInETH
        : parseUnits(
          (amountInETH / token0ETHValue).toString(),
          pool.token0.decimals
        )
      const wei1 = network.WETH.equals(pool.token1)
        ? amountInETH
        : parseUnits(
          (amountInETH / token1ETHValue).toString(),
          pool.token1.decimals
        )

      const [lower, upper] = estimateRange()

      const positionLiquidity = maxLiquidityForAmounts(
        pool?.sqrtRatioX96,
        TickMath.getSqrtRatioAtTick(lower),
        TickMath.getSqrtRatioAtTick(upper),
        wei0.toString(),
        wei1.toString(),
        true
      )

      const share = new Fraction(
        positionLiquidity.toString(),
        JSBI.add(
          positionLiquidity,
          JSBI.BigInt(pool.liquidity.toString())
        ).toString()
      )

      const fee = pool.fee ? pool.fee / 1000000 : FeeAmount.LOWEST / 1000000
      const result = volume * fee * parseFloat(share.toFixed(10))

      return {
        wei0,
        wei1,
        depositAmount,
        fee,
        volume,
        share,
        lower,
        upper,
        fees24h: result,
        fees30d: result * 30,
        fees365d: result * 365,
      }
    },
    [pool]
  )

  return {
    getPosition,
    estimateRange,
    getEstimatedPosition,
    pool,
  }
}

export default usePool
