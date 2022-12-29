import { useState, useEffect, useContext, useCallback, useRef } from "react"
import { useUniswapPoolContract } from "./useContract"
import { Position, Slot0 } from "../info/types"
import { BigNumber, ethers } from "ethers"
import {
  FeeAmount,
  maxLiquidityForAmounts,
  nearestUsableTick,
  Pool,
  TickMath,
} from "@uniswap/v3-sdk"
import { Token } from "@uniswap/sdk-core"
import useToken from "./useToken"
import { Global } from "../context/GlobalContext"
import { useWeb3React } from "@web3-react/core"

const usePool = (address?: string) => {
  const { chainId } = useWeb3React()
  const { theList } = useContext(Global)
  const contract = useUniswapPoolContract(address)
  const [pool, setPool] = useState<Pool | undefined>()
  const { tokens } = useToken()
  const loaded = useRef(false)

  // TODO: MULTICALL
  useEffect(() => {
    const fetch = async () => {
      loaded.current = true

      const slot0 = await contract?.slot0()
      const liquidity = await contract?.liquidity()
      const tp = theList.tidePools.find(
        (tp) => tp.pool.address.toLowerCase() === address?.toLowerCase()
      )
      const token0 = tokens.find(
        (t) => t.address.toLowerCase() === tp?.pool.token0.address.toLowerCase()
      )
      const token1 = tokens.find(
        (t) => t.address.toLowerCase() === tp?.pool.token1.address.toLowerCase()
      )
      const fee = tp?.pool.fee ?? FeeAmount.LOWEST

      setPool(getPool(slot0, fee, liquidity?.toString(), token0, token1))
    }
    if (address && contract) fetch()
  }, [contract, address, theList.tidePools, tokens, chainId])

  const estimateRange = useCallback(() => {
    const tick = pool ? pool.tickCurrent : 0
    const tickSpacing = pool ? pool?.tickSpacing : 10

    const multiplier =
      pool?.tickSpacing === 200 ? 2.5 : pool?.tickSpacing === 60 ? 8 : 50

    return [
      nearestUsableTick(tick - multiplier * tickSpacing, tickSpacing),
      nearestUsableTick(tick + multiplier * tickSpacing, tickSpacing),
    ]
  }, [pool])

  const estimatePosition = (): Position => {
    let position = {
      liquidity: BigNumber.from(0),
      tokensOwed0: BigNumber.from(0),
      tokensOwed1: BigNumber.from(0),
      feeGrowthInside0LastX128: BigNumber.from(0),
      feeGrowthInside1LastX128: BigNumber.from(0),
    } as Position
    if (!pool) return position
    const [l, u] = estimateRange()

    const amount0 = ethers.utils.parseUnits("10", pool?.token0.decimals)
    const amount1 = ethers.utils.parseUnits("10", pool?.token1.decimals)
    const liquidity = BigNumber.from(
      maxLiquidityForAmounts(
        pool?.sqrtRatioX96,
        TickMath.getSqrtRatioAtTick(l),
        TickMath.getSqrtRatioAtTick(u),
        amount0.toString(),
        amount1.toString(),
        false
      ).toString()
    )

    return { ...position, liquidity }
  }

  const getPosition = async (
    owner: string,
    lower: BigNumber,
    upper: BigNumber
  ): Promise<Position> => {
    const str = ethers.utils.solidityKeccak256(
      ["address", "int24", "int24"],
      [owner, lower, upper]
    )
    const position: Position = await contract?.positions(str)
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

  return {
    getPosition,
    estimateRange,
    estimatePosition,
    pool,
  }
}

export default usePool
