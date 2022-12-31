import { useState, useEffect, useContext, useMemo } from "react"
import { useTidePoolContract } from "./useContract"
import { BigNumber } from "ethers"
import { tickToPrice } from "@uniswap/v3-sdk"
import usePool from "./usePool"
import useToken from "./useToken"
import { Global } from "../context/GlobalContext"

const useTidePool = (address?: string, user?: string | null) => {
  const { theList } = useContext(Global)
  const tidePool = theList.tidePools.find((p) => p.address === address)
  const contract = useTidePoolContract(address)
  const [balance, setBalance] = useState(BigNumber.from(0))
  const [upper, setUpper] = useState<BigNumber>(BigNumber.from(0))
  const [lower, setLower] = useState<BigNumber>(BigNumber.from(0))
  const [totalSupply, setTotalSupply] = useState<BigNumber>(BigNumber.from(0))
  const { getPosition, pool, estimatePosition } = usePool(
    tidePool?.pool.address
  )
  const { token: token0 } = useToken(tidePool?.pool.token0.address)
  const { token: token1 } = useToken(tidePool?.pool.token1.address)

  useEffect(() => {
    const fetch = async () => {
      setUpper(BigNumber.from(await contract?.upper()))
      setLower(BigNumber.from(await contract?.lower()))
      setTotalSupply(await contract?.totalSupply())
    }
    if (address && contract?.provider) fetch()
  }, [contract, address])

  useEffect(() => {
    const getBalance = async () => {
      setBalance(await contract?.balanceOf(user))
    }
    if (user && contract?.provider) getBalance()
  }, [contract, user])

  const positionDisplay: {
    price: string
    lower: string
    upper: string
  } = useMemo(() => {
    if (!token0 || !token1 || !lower || !upper || !pool)
      return { price: "0", lower: "0", upper: "0" }

    const price = tickToPrice(token0, token1, pool.tickCurrent)
    const l = tickToPrice(token0, token1, lower.toNumber())
    const u = tickToPrice(token0, token1, upper.toNumber())

    return {
      price: price.toFixed(2),
      lower: l.toFixed(2),
      upper: u.toFixed(2),
    }
  }, [token0, token1, lower, upper, pool])

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
    deposit,
    withdraw,
    contract,
    upper,
    lower,
    totalSupply,
  }
}

export default useTidePool
