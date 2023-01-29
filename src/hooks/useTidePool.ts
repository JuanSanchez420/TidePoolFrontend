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
import { Price, Token } from "@uniswap/sdk-core"
import JSBI from "jsbi"

const useTidePool = (address?: string) => {
  const { address: account } = useAccount()
  const { theList } = useContext(Global)
  const tidePool = theList.tidePools.find((p) => p.address === address)
  const contract = useTidePoolContract(address)
  const [balance, setBalance] = useState<BigNumber | undefined>()
  const [upper, setUpper] = useState<BigNumber>(BigNumber.from(0))
  const [lower, setLower] = useState<BigNumber>(BigNumber.from(0))
  const [position, setPosition] = useState<Position>()
  const [totalSupply, setTotalSupply] = useState<BigNumber>(BigNumber.from(0))
  const { getPosition, pool, estimatePosition, getOustandingFees } = usePool(
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
    const f = async (a: string) => {
      positionMounted.current = true
      const upper = await contract?.upper()
      const lower = await contract?.lower()

      if (lower && upper && pool) {
        const pos = await getPosition(a, lower, upper)
        setPosition(new Position({
          pool,
          liquidity: pos.liquidity.toString(),
          tickLower: lower,
          tickUpper: upper,
        }))
        
        // const fees = await getOustandingFees(address || "", lower, upper)
      }
    }
    if (address && pool && contract && !positionMounted.current) f(address)
  }, [address, pool, contract, getPosition, account])

  const deposit = async (zero: BigNumber, one: BigNumber) => {
    try {
      await contract?.deposit(zero, one)
    } catch (e) {
      console.log(e)
    }
  }

  const withdraw = async () => {
    try {
      await contract?.withdraw()
    } catch (e) {
      console.log(e)
    }
  }

  return {
    pool,
    balance,
    position,
    deposit,
    withdraw,
    contract,
    upper,
    lower,
    totalSupply,
  }
}

export default useTidePool
