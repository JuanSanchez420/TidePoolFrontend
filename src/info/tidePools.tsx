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
            return "0x51233465F2D1D51DEbd4eB055efc848d74d8905d"
        case 42161:
            return "0x3395c4503acEc1CA99E1340a80c0E6620689D592"
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
        address: "0x675dF431C8a2853D50f7Ece046Ba22C7d902eaEF",
        pool: ensure(pools.find(t=>t.address === "0xDaC8A8E6DBf8c690ec6815e0fF03491B2770255D")),
        chain: Polygon
    }
    ,{
        address: "0x3f0674A75a95bd8bd8e21908C82837eaA1623479",
        pool: ensure(pools.find(t=>t.address === "0xa374094527e1673a86de625aa59517c5de346d32")),
        chain: Polygon
    }
    ,{
        address: "0xA18b09a5028731472eBB03FAF0d71977f82f7Ebf",
        pool: ensure(pools.find(t=>t.address === "0x86f1d8390222A3691C28938eC7404A1661E618e0")),
        chain: Polygon
    }
]

export const tidePools = tidePoolsEthereum.concat(tidePoolsArbitrum).concat(tidePoolsOptimism).concat(tidePoolsPolygon)