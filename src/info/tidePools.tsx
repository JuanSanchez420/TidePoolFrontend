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
    },
    {
        address: "0x1e2F34ac2Aa5Ec7aF68921F937232b7fAAc9508f",
        pool: ensure(pools.find(t=>t.address === "0xC31E54c7a869B9FcBEcc14363CF510d1c41fa443")),
        chain: Arbitrum
    },
    {
        address: "0x1e2F34ac2Aa5Ec7aF68921F937232b7fAAc9508f",
        pool: ensure(pools.find(t=>t.address === "0xC31E54c7a869B9FcBEcc14363CF510d1c41fa443")),
        chain: Arbitrum
    },
    {
        address: "0x1e2F34ac2Aa5Ec7aF68921F937232b7fAAc9508f",
        pool: ensure(pools.find(t=>t.address === "0xC31E54c7a869B9FcBEcc14363CF510d1c41fa443")),
        chain: Arbitrum
    },
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
        address: "0x123456789",
        pool: ensure(pools.find(t=>t.address === "0xa374094527e1673a86de625aa59517c5de346d32")),
        chain: Polygon
    },
]

export const tidePools = tidePoolsEthereum.concat(tidePoolsArbitrum).concat(tidePoolsOptimism).concat(tidePoolsPolygon)