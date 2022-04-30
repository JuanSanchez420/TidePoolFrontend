import { Pool, pools, ensure } from "./pools"
import { Network, Ethereum, Arbitrum, Optimism, Polygon } from "../info/networks"

export interface TidePool {
    address: string
    pool: Pool
    chain: Network
}

const tidePoolsEthereum: TidePool[] = [
    {
        address: "0x123456789",
        pool: ensure(pools.find(t=>t.address === "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")),
        chain: Ethereum
    },
]
const tidePoolsArbitrum: TidePool[] = [
    {
        address: "0x1e2F34ac2Aa5Ec7aF68921F937232b7fAAc9508f",
        pool: ensure(pools.find(t=>t.address === "0xC31E54c7a869B9FcBEcc14363CF510d1c41fa443")),
        chain: Arbitrum
    }
]
const tidePoolsOptimism: TidePool[] = [
    {
        address: "0x123456789",
        pool: ensure(pools.find(t=>t.address === "0x03aF20bDAaFfB4cC0A521796a223f7D85e2aAc31")),
        chain: Optimism
    },
]
const tidePoolsPolygon: TidePool[] = [
    {
        address: "0xDd4FD87F714ab19924D52AB4208C5665C3784449",
        pool: ensure(pools.find(t=>t.address === "0xa374094527e1673a86de625aa59517c5de346d32")),
        chain: Polygon
    },
    {
        address: "0xA8CB6266f293FA59D18717a35312A58C78406203",
        pool: ensure(pools.find(t=>t.address === "0x86f1d8390222A3691C28938eC7404A1661E618e0")),
        chain: Polygon
    },
    {
        address: "0x3395c4503acEc1CA99E1340a80c0E6620689D592",
        pool: ensure(pools.find(t=>t.address === "0x50eaEDB835021E4A108B7290636d62E9765cc6d7")),
        chain: Polygon
    },
    {
        address: "0x9683504E896D4F9d18bfdcC9a4FB8FE10a23e45d",
        pool: ensure(pools.find(t=>t.address === "0xDaC8A8E6DBf8c690ec6815e0fF03491B2770255D")),
        chain: Polygon
    },
    {
        address: "0x58E073f91a03035C302E473d39f1540983007e42",
        pool: ensure(pools.find(t=>t.address === "0x50eaEDB835021E4A108B7290636d62E9765cc6d7")),
        chain: Polygon
    }
]

export const tidePools = tidePoolsEthereum.concat(tidePoolsArbitrum).concat(tidePoolsOptimism).concat(tidePoolsPolygon)