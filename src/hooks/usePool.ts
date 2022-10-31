import { useState, useEffect, useContext } from "react"
import { useUniswapPoolContract } from "./useContract"
import { Slot0 } from "../info/types"
import { BigNumber, ethers } from "ethers"
import { FeeAmount, nearestUsableTick, Pool, TickMath } from "@uniswap/v3-sdk"
import { Token } from "@uniswap/sdk-core"
import useToken from "./useToken"
import { Global } from "../context/GlobalContext"

const usePool = (address?: string) => {
  const { theList } = useContext(Global)
  const contract = useUniswapPoolContract(address)
  const [pool, setPool] = useState<Pool | undefined>()
  const { tokens } = useToken()

  // TODO: MULTICALL
  useEffect(() => {
    const fetch = async () => {
      const slot0 = await contract?.slot0()
      const liquidity = await contract?.liquidity()
      const tp = theList.tidePools.find(tp=>tp.pool.address === address)
      const token0 = tokens.find(t=>t.address === tp?.pool.token0.address)
      const token1 = tokens.find(t=>t.address === tp?.pool.token1.address)
      const fee = tp?.pool.fee ?? FeeAmount.LOWEST
      setPool(getPool(slot0, fee, liquidity.toString(), token0, token1))
    }
    if (contract && address) fetch()
  }, [contract, address, theList.tidePools, tokens])

  const estimateRange = (tick: number, tickSpacing: number): [lower: number, upper: number] => {
    const fivePercent = Math.abs(Math.floor(tick * 0.05))
    
    return [nearestUsableTick(tick - fivePercent, tickSpacing), nearestUsableTick(tick + fivePercent, tickSpacing)]
  }

  const getPosition = async (
    owner: string,
    lower: BigNumber,
    upper: BigNumber
  ) => {
    const str = ethers.utils.solidityKeccak256(
      ["address", "int24", "int24"],
      [owner, lower, upper]
    )
    return await contract?.positions(str)
  }

  const getPool = (slot0: Slot0, fee: FeeAmount, liquidity: string, token0?: Token, token1?: Token) => {
    if(!slot0 || !fee || !liquidity || !token0 || !token1) return undefined
    return new Pool(token0, token1, fee, slot0.sqrtPriceX96.toString(), liquidity.toString(), slot0.tick)
  }

  return {
    getPosition,
    estimateRange,
    pool
  }
}

export default usePool
