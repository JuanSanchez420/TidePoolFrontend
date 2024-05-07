import { useState, useEffect, useContext, useRef } from "react"
import { useTidePoolContract } from "./useContract"
import { Position } from "@uniswap/v3-sdk"
import usePool, { EstimatedPosition } from "./usePool"
import { Global } from "../context/GlobalContext"
import { useAccount, usePublicClient } from "wagmi"
import { CurrencyAmount, Token } from "@uniswap/sdk-core"
import { multicall } from "@wagmi/core"
import { TIDEPOOL_ABI } from "../info/abi"
import useSubgraph from "./useSubgraph"
import { parseEther } from "viem"

const useTidePool = (address?: string) => {
  const { address: account } = useAccount()
  const { theList, network } = useContext(Global)
  const tidePool = theList.tidePools.find((p) => p.address === address)
  const contract = useTidePoolContract(address)
  const [balance, setBalance] = useState<bigint | undefined>()
  const [position, setPosition] = useState<Position>()
  const [lastRebalance, setLastRebalance] = useState<bigint>()
  const [pendingRewards, setPendingRewards] = useState<{
    rewards0: CurrencyAmount<Token>
    rewards1: CurrencyAmount<Token>
  }>()
  const [totalSupply, setTotalSupply] = useState<bigint>(0n)
  const { getPosition, getEstimatedPosition, pool } = usePool(tidePool?.poolAddress)
  const balanceMounted = useRef(false)
  const positionMounted = useRef(false)
  const publicClient = usePublicClient()
  const { getVolume, getETHUSD, getDerivedETHValue } = useSubgraph()

  const [estimatedPosition, setEstimatedPosition] =
    useState<EstimatedPosition | null>(null)

  useEffect(() => {
    const getBalance = async () => {
      if (!contract) return
      balanceMounted.current = true
      const r = (await contract.read.balanceOf([account])) as bigint
      setBalance(r)
    }
    if (account && !balanceMounted.current) getBalance()
  }, [contract, account])

  useEffect(() => {
    const f = async (a: `0x${string}`) => {
      positionMounted.current = true

      const tp = {
        address: a as `0x${string}`,
        abi: TIDEPOOL_ABI,
      } as const
      const calls = await multicall({
        chainId: network?.chainId,
        contracts: [
          {
            ...tp,
            functionName: "upper",
          },
          { ...tp, functionName: "lower" },
          { ...tp, functionName: "lastRebalance" },
          { ...tp, functionName: "totalSupply" },
        ],
      })
      const upper = calls[0].result
      const lower = calls[1].result

      setLastRebalance((calls[2].result as bigint) || 0n)
      setTotalSupply((calls[3].result as bigint) || 0n)

      if (lower && upper && pool && contract) {
        const pos = await getPosition(a, BigInt(lower), BigInt(upper))
        setPosition(
          new Position({
            pool,
            liquidity: pos.liquidity.toString(),
            tickLower: Number(lower),
            tickUpper: Number(upper),
          })
        )

        const { result: pendingRewards }: { result: any } =
          await contract.simulate.harvest([])

        setPendingRewards({
          rewards0: CurrencyAmount.fromRawAmount(
            pool.token0,
            (pendingRewards[0] as bigint).toString()
          ),
          rewards1: CurrencyAmount.fromRawAmount(
            pool.token1,
            (pendingRewards[1] as bigint).toString()
          ),
        })
      }
    }
    if (address && pool && contract && !positionMounted.current)
      f(address as `0x${string}`)
  }, [address, pool, contract, getPosition, account, network])

  useEffect(() => {
    const f = async () => {
      if (!tidePool || !pool || !network || position || estimatedPosition)
        return
      const ETHUSD = await getETHUSD()

      const token0ETHValue = network.WETH.equals(pool.token0)
        ? parseEther("1")
        : await getDerivedETHValue(pool.token0.address)
      const token1ETHValue = network.WETH.equals(pool.token1)
        ? parseEther("1")
        : await getDerivedETHValue(pool.token1.address)

      const volume = await getVolume(tidePool.poolAddress)

      const results = getEstimatedPosition(
        ETHUSD,
        token0ETHValue,
        token1ETHValue,
        volume
      )

      if (results) setEstimatedPosition(results)
    }
    f()
  }, [
    network,
    setEstimatedPosition,
    tidePool,
    pool,
    position,
    getVolume,
    getETHUSD,
    getDerivedETHValue,
    getEstimatedPosition,
  ])

  const deposit = async (zero: bigint, one: bigint) => {
    if (!contract) return
    try {
      const hash = await contract.write.deposit([zero, one])
      await publicClient.waitForTransactionReceipt({ hash })
      const r = (await contract.read.balanceOf([account])) as bigint
      setBalance(r)
    } catch (e: any) {
      console.log(e)
      throw e
    }
  }

  const withdraw = async () => {
    if (!contract) return
    try {
      const hash = await contract.write.withdraw([])
      await publicClient.waitForTransactionReceipt({ hash })
      const r = (await contract.read.balanceOf([account])) as bigint
      setBalance(r)
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  const harvest = async () => {
    if (!contract) return
    try {
      const hash = await contract.write.harvest([])
      await publicClient.waitForTransactionReceipt({ hash })
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  return {
    pool,
    balance,
    position,
    pendingRewards,
    lastRebalance,
    deposit,
    withdraw,
    harvest,
    contract,
    totalSupply,
    estimatedPosition
  }
}

export default useTidePool
