import { Pool, pools, ensure } from "./pools"
import { Network, Ethereum, Arbitrum, Optimism, Polygon } from "../info/networks"

export interface TidePool {
    address: string
    pool: Pool
    chain: Network
}

export const getFactoryAddress = (chainId: number) => {
    switch(chainId) {
        case 1:
            return "0x0"
        case 10:
            return "0x0"
        case 137:
            return "0x19E0a5501425f53dF2d2ceFb0A8526b36dEC5Bd9"
        case 42161:
            return "0x680B60e3957C8E6b7d93b70B8e70BCE20d17f4f4"
        default:
            return "0x0"
    }
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
        address: "0xD0A7E5cAFB4BdD68f66BA700633033f5698F77d9",
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
        address: "0x8e542F3145471d9D7CBa0E59E1c2C1651614cb6D",
        pool: ensure(pools.find(t=>t.address === "0xDaC8A8E6DBf8c690ec6815e0fF03491B2770255D")),
        chain: Polygon
    }
    ,{
        address: "0xb28dBd8203A3C2C33c7F0d09cAE433BD64EC543A",
        pool: ensure(pools.find(t=>t.address === "0xa374094527e1673a86de625aa59517c5de346d32")),
        chain: Polygon
    }
    ,{
        address: "0x85F9Da20e9c04A34D94ab2fd891444eE0E44392A",
        pool: ensure(pools.find(t=>t.address === "0x86f1d8390222A3691C28938eC7404A1661E618e0")),
        chain: Polygon
    }
]

export const tidePools = tidePoolsEthereum.concat(tidePoolsArbitrum).concat(tidePoolsOptimism).concat(tidePoolsPolygon)