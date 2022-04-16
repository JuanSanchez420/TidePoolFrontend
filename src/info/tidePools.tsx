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
        address: "0x53eaf5f52c3b769f45ea5474d4910bb37df75d1c",
        pool: ensure(pools.find(t=>t.address === "0xa374094527e1673a86de625aa59517c5de346d32")),
        chain: Polygon
    },
    {
        address: "0x58E073f91a03035C302E473d39f1540983007e42",
        pool: ensure(pools.find(t=>t.address === "0x50eaEDB835021E4A108B7290636d62E9765cc6d7")),
        chain: Polygon
    },
    {
        address: "0x451d89c2Ef29F5e4b373dA42738A89B9455ec4b4",
        pool: ensure(pools.find(t=>t.address === "0x86f1d8390222A3691C28938eC7404A1661E618e0")),
        chain: Polygon
    },
    {
        address: "0x0C58D389C38b2be00DA99F042F6d9bb2e8498634",
        pool: ensure(pools.find(t=>t.address === "0x5f69C2ec01c22843f8273838d570243fd1963014")),
        chain: Polygon
    },
]

export const tidePools = tidePoolsEthereum.concat(tidePoolsArbitrum).concat(tidePoolsOptimism).concat(tidePoolsPolygon)