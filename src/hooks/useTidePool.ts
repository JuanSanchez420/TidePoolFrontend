import { useState, useEffect, useContext, useMemo, useRef } from "react"
import { useTidePoolContract } from "./useContract"
import { BigNumber, ethers } from "ethers"
import {
  tickToPrice,
  Position,
  PositionLibrary,
  TickLibrary,
} from "@uniswap/v3-sdk"
import usePool from "./usePool"
import useToken from "./useToken"
import { Global } from "../context/GlobalContext"
import { useAccount } from "wagmi"
import { CurrencyAmount, Price, Token } from "@uniswap/sdk-core"
import JSBI from "jsbi"
import { multicall } from "@wagmi/core"
import { TIDEPOOL_ABI } from "../info/abi"

const useTidePool = (address?: string) => {
  const { address: account } = useAccount()
  const { theList } = useContext(Global)
  const tidePool = theList.tidePools.find((p) => p.address === address)
  const contract = useTidePoolContract(address)
  const [balance, setBalance] = useState<BigNumber | undefined>()
  const [upper, setUpper] = useState<BigNumber>(BigNumber.from(0))
  const [lower, setLower] = useState<BigNumber>(BigNumber.from(0))
  const [position, setPosition] = useState<Position>()
  const [lastRebalance, setLastRebalance] = useState<BigNumber>()
  const [pendingRewards, setPendingRewards] = useState<{
    rewards0: CurrencyAmount<Token>
    rewards1: CurrencyAmount<Token>
  }>()
  const [totalSupply, setTotalSupply] = useState<BigNumber>(BigNumber.from(0))
  const { getPosition, pool, estimatePosition } = usePool(
    tidePool?.pool.address
  )
  const balanceMounted = useRef(false)
  const positionMounted = useRef(false)

  useEffect(() => {
    const getBalance = async () => {
      balanceMounted.current = true
      setBalance(await contract?.balanceOf(account))
    }
    if (account && contract && !balanceMounted.current) getBalance()
  }, [contract, account])

  useEffect(() => {
    const f = async (a: `0x${string}`) => {
      positionMounted.current = true

      const tp = {
        address: a,
        abi: TIDEPOOL_ABI,
      }
      const calls = await multicall({
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
      const upper = calls[0] as number
      const lower = calls[1] as number

      setLastRebalance(calls[2] as BigNumber)
      setTotalSupply(calls[3] as BigNumber)

      if (lower && upper && pool) {
        const pos = await getPosition(
          a,
          ethers.BigNumber.from(lower),
          ethers.BigNumber.from(upper)
        )
        setPosition(
          new Position({
            pool,
            liquidity: pos.liquidity.toString(),
            tickLower: lower,
            tickUpper: upper,
          })
        )

        const pendingRewards = await contract?.callStatic.harvest()
        
        setPendingRewards({
          rewards0: CurrencyAmount.fromRawAmount(pool.token0, pendingRewards[0]),
          rewards1: CurrencyAmount.fromRawAmount(pool.token1, pendingRewards[1]),
        })
      }
    }
    if (address && pool && contract && !positionMounted.current)
      f(address as `0x${string}`)
  }, [address, pool, contract, getPosition, account])

  const deposit = async (zero: BigNumber, one: BigNumber) => {
    try {
      const tx = await contract?.deposit(zero, one)
      await tx.wait()
      setBalance(await contract?.balanceOf(account))
    } catch (e) {
      console.log(e)
    }
  }

  const withdraw = async () => {
    try {
      const tx = await contract?.withdraw()
      await tx.wait()
      setBalance(await contract?.balanceOf(account))
    } catch (e) {
      console.log(e)
    }
  }

  const harvest = async () => {
    try {
      await contract?.harvest()
    } catch (e) {
      console.log(e)
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
    upper,
    lower,
    totalSupply,
  }
}

export default useTidePool
