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
            return "0x03b144EcE4786493b5289CEefa69079CAa579a3E"
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
        address: "0xc038dB1A40f3b611AbC81Be0a24Fab27563d54af",
        pool: ensure(pools.find(t=>t.address === "0xDaC8A8E6DBf8c690ec6815e0fF03491B2770255D")),
        chain: Polygon
    }
    ,{
        address: "0xA374094527e1673A86dE625aa59517c5dE346d32",
        pool: ensure(pools.find(t=>t.address === "0xa374094527e1673a86de625aa59517c5de346d32")),
        chain: Polygon
    }
    ,{
        address: "0x76cc79D2a8c698b840AE07D5F4b6D921A87e0238",
        pool: ensure(pools.find(t=>t.address === "0x86f1d8390222A3691C28938eC7404A1661E618e0")),
        chain: Polygon
    }
]

export const tidePools = tidePoolsEthereum.concat(tidePoolsArbitrum).concat(tidePoolsOptimism).concat(tidePoolsPolygon)