import { useCallback } from "react"
import { gql, request } from "graphql-request"
import useNetwork from "./useNetwork"
import {BigNumber} from "ethers"
import { TickMath } from "@uniswap/v3-sdk"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export interface Ticks {
  ticks: Tick[]
}

export interface Tick {
  tickIdx: string
  liquidityNet: string
}

export interface VolumeUSD {
  volumeUSD: string
}

const useSubgraph = () => {
  const network = useNetwork()

  const getVolume24 = useCallback(async (pool: string): Promise<VolumeUSD> => {
    const q = gql`
      {
        poolDayDatas(
          first: 1
          orderBy: date
          orderDirection: desc
          where: { pool_: { id: "${pool.toLowerCase()}" } }
        ) {
          volumeUSD
        }
      }
    `
    const r = await request(network.subgraph, q)

    return r.poolDayDatas[0]
  }, [network])

  const getVolume = async (pool: string) => {
    const r = await getVolume24(pool)
    return parseInt(r.volumeUSD)
  }

  const getTicksByPage = useCallback(
    async (pool: string, page: number, lower: number, upper: number): Promise<Tick[]> => {
      const getTicks = gql`
    {
      ticks(first: 1000, skip: ${
        page * 1000
      }, where: { poolAddress: "${pool.toLowerCase()}", tickIdx_gte: "${lower}", tickIdx_lte: "${upper}"}, orderBy: tickIdx) {
        tickIdx
        liquidityNet
      }
    }
    `
      const r = await request(network.subgraph, getTicks)

      return r.ticks
    },
    [network]
  )

  const getTicks = async (pool: string, lower: number, upper: number) => {
    console.log(`getting ticks for pool: ${pool}`)
    let ticks: Tick[] = []
    let page = 0

    while (true) {
      const r = await getTicksByPage(pool, page, lower, upper)
      ticks = ticks.concat(r)

      if (r.length === 1000) {
        page++
      } else {
        break
      }
      await sleep(500)
    }
console.log(ticks)
    return ticks
  }

  const sumNetLiquidity = (ticks: Tick[]) => {
console.log(`ticks.length: ${ticks.length}`)
    let total = BigNumber.from(0)
    ticks.forEach((t,i)=>{
      total = total.add(BigNumber.from(t.liquidityNet))
    })
    return total
  }

  const getLiquidity = async (pool: string, lower?:number, upper?:number) => {
    const ticks = await getTicks(pool, lower ?? TickMath.MIN_TICK, upper ?? TickMath.MAX_TICK)
    const sum = sumNetLiquidity(ticks)
    return sum
  }

  return { getVolume, getLiquidity }
}

export default useSubgraph
