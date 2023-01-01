import { useCallback } from "react"
import { gql, request } from "graphql-request"
import { BigNumber, ethers } from "ethers"
import { TickMath, tickToPrice } from "@uniswap/v3-sdk"
import useNetwork from "./useNetwork"
import sleep from "../utils/sleep"

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

  const getETHUSD = useCallback(async (): Promise<number> => {
    const q = gql`
    {
      pool(id: "${network.ETHUSD.toLowerCase()}") {
        tick
      }
    }
    `
    const r = await request(network.subgraph, q)

    const tick = Number(r.pool.tick)
    const str = tickToPrice(network.WETH, network.USDC, tick).toFixed(0)

    return Number(str)
  }, [network])

  const getDerivedETHValue = useCallback(
    async (token: string): Promise<BigNumber> => {
      const q = gql`
      {
        token(id: "${token.toLowerCase()}") {
          derivedETH
        }
      }
    `
      const r = await request(network.subgraph, q)
      const parts = r.token.derivedETH.split(".")
      const whole = parts[0]
      const decimals =
        parts[1] && parts[1].length < 18 ? parts[1] : parts[1].substring(0, 17)
      return ethers.utils.parseEther(`${whole}.${decimals}`)
    },
    [network]
  )

  const getVolume24 = useCallback(
    async (pool: string): Promise<VolumeUSD> => {
      // get the previous full day of volume data
      const q = gql`
      {
        poolDayDatas(
          first: 2
          orderBy: date
          orderDirection: desc
          where: { pool: "${pool.toLowerCase()}" }
        ) {
          volumeUSD
        }
      }
    `
      const r = await request(network.subgraph, q)

      return r.poolDayDatas[1]
    },
    [network]
  )

  const getVolume = async (pool: string) => {
    const r = await getVolume24(pool)
    return parseInt(r.volumeUSD)
  }

  const getTicksByPage = useCallback(
    async (
      pool: string,
      page: number,
      lower: number,
      upper: number
    ): Promise<Tick[]> => {
      const getTicks = gql`
    {
      ticks(first: 1000, skip: ${
        page * 1000
      }, where: { pool: "${pool.toLowerCase()}", tickIdx_gte: "${lower}", tickIdx_lte: "${upper}"}, orderBy: tickIdx) {
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
    return ticks
  }

  const sumNetLiquidity = (ticks: Tick[]) => {
    let total = BigNumber.from(0)
    ticks.forEach((t, i) => {
      total = total.add(BigNumber.from(t.liquidityNet))
    })
    return total
  }

  const getLiquidity = async (pool: string, lower?: number, upper?: number) => {
    const ticks = await getTicks(
      pool,
      lower ?? TickMath.MIN_TICK,
      upper ?? TickMath.MAX_TICK
    )
    const sum = sumNetLiquidity(ticks)
    return sum
  }

  return { getVolume, getLiquidity, getETHUSD, getDerivedETHValue }
}

export default useSubgraph
