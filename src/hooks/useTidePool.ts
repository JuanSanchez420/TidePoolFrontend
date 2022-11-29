import { useState, useEffect, useContext, useMemo, useCallback } from "react"
import { useTidePoolContract } from "./useContract"
import { BigNumber } from "ethers"
import useSubgraph from "./useSubgraph"
import { FeeAmount, TickMath, tickToPrice } from "@uniswap/v3-sdk"
import usePool from "./usePool"
import { Fraction } from "@uniswap/sdk-core"
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
  const { getVolume, getLiquidity } = useSubgraph()
  const { getPosition, pool, estimatePosition } = usePool(tidePool?.pool.address)
  const { token: token0 } = useToken(tidePool?.pool.token0.address)
  const { token: token1 } = useToken(tidePool?.pool.token1.address)

  // TODO: multicall
  useEffect(() => {
    const fetch = async () => {
      setUpper(BigNumber.from(await contract?.upper()))
      setLower(BigNumber.from(await contract?.lower()))
      setTotalSupply(await contract?.totalSupply())
    }
    if (address) fetch()
  }, [contract, address])

  useEffect(() => {
    const getBalance = async () => {
      setBalance(await contract?.balanceOf(user))
    }
    if (user) getBalance()
  }, [contract, user])

  // fee * 24hVolume * (position / (position + totalLiquidity))
  const calculateFee = useCallback(async () => {
    if(!tidePool || !pool) return 0
    const volume = await getVolume(tidePool?.pool.address.toLowerCase() || "")
    const liquidity = await getLiquidity(
      tidePool?.pool.address.toLowerCase() || "",
      TickMath.MIN_TICK,
      pool?.tickCurrent
    )
    if(liquidity.eq(0) || volume === 0) return 0
    
    let position = await getPosition(address || "", lower, upper)

    if(position.liquidity.eq(0))
      position = estimatePosition()

    const fraction = new Fraction(
      position.liquidity.toString(),
      position.liquidity.add(liquidity).toString()
    )

    const fee = tidePool?.pool.fee ? tidePool?.pool.fee / 1000000 : FeeAmount.LOWEST / 1000000

    const result = volume *  fee * parseFloat(fraction.toFixed(10))

    // TODO: calculate deposit amount

    return result
  },[pool, tidePool, address, getVolume, getLiquidity, getPosition, lower, upper, estimatePosition])

  const positionDisplay: {
    price: string
    lower: string
    upper: string
  } = useMemo(()=>{
    if (!token0 || !token1 || !lower || !upper || !pool)
      return { price: "0", lower: "0", upper: "0" }

    const price = tickToPrice(token0, token1, pool.tickCurrent)
    const l = tickToPrice(token0, token1, lower.toNumber())
    const u = tickToPrice(token0, token1, upper.toNumber())

    return {
      price: price.toFixed(2),
      lower: l.toFixed(2),
      upper: u.toFixed(2),
    }},[token0, token1, lower, upper, pool])

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
    calculateFee
  }
}

export default useTidePool
