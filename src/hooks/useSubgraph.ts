import { useCallback, useContext } from "react"
import { gql, request } from "graphql-request"
import { tickToPrice } from "@uniswap/v3-sdk"
import { Global } from "../context/GlobalContext"
import { parseEther } from "viem"

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
  const { network } = useContext(Global)

  const getETHUSD = useCallback(async (): Promise<number> => {
    const q = gql`
    {
      pool(id: "${network.ETHUSD.toLowerCase()}") {
        tick
      }
    }
    `
    const r: any = await request(network.subgraph, q)

    const tick = Number(r.pool.tick)
    const str = tickToPrice(network.WETH, network.USDC, tick).toFixed(0)

    return Number(str)
  }, [network])

  const getDerivedETHValue = useCallback(
    async (token: string): Promise<bigint> => {
      const q = gql`
      {
        token(id: "${token.toLowerCase()}") {
          derivedETH
        }
      }
    `
      const r: any = await request(network.subgraph, q)
      const parts = r.token.derivedETH.split(".")
      const whole = parts[0]
      const decimals =
        parts[1] && parts[1].length < 18
          ? parts[1]
          : parts[1]
          ? parts[1].substring(0, 17)
          : "0"
      return parseEther(`${whole}.${decimals}`)
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
      const r: any = await request(network.subgraph, q)

      return r.poolDayDatas[1]
    },
    [network]
  )

  const getVolume = async (pool: string) => {
    const r = await getVolume24(pool)
    return parseInt(r.volumeUSD)
  }

  const getMostRecentTx = useCallback(
    async (tidePool: string) => {
      const q = gql`
      {
        transactions(
          first: 1
          orderBy: timestamp
          orderDirection: desc
          where: {mints_: {sender: "${tidePool.toLowerCase()}"}}
        ) {
          timestamp
        }
      }
  `
      const r: any = await request(network.subgraph, q)
      return r.transactions.length > 0 ? r.transactions[0].timestamp : null
    },
    [network]
  )

  return {
    getVolume,
    getETHUSD,
    getDerivedETHValue,
    getMostRecentTx,
  }
}

export default useSubgraph
