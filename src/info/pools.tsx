import { Ethereum, Network, Polygon, Arbitrum, Optimism } from "./networks"
import { Token, tokens } from "./tokens"

export interface Pool {
    address: string
    token0: Token
    token1: Token
}

export const ensure = <T,>(p: T | undefined | null) => {
    if(p === undefined || p === null)
        throw new TypeError("undefined / null")
    return p
}

const poolsEthereum: Pool[] = [
    {
        address: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640",
        token0: ensure(tokens.find(t=>t.symbol === "USDC" && t.chain.name === "Ethereum")),
        token1: ensure(tokens.find(t=>t.symbol === "WETH" && t.chain.name === "Ethereum")),
    },
]

const poolsArbitrum: Pool[] = [
    {
        address: "0xC31E54c7a869B9FcBEcc14363CF510d1c41fa443",
        token0: ensure(tokens.find(t=>t.symbol === "WETH" && t.chain.name === "Arbitrum")),
        token1: ensure(tokens.find(t=>t.symbol === "USDC" && t.chain.name === "Arbitrum")),
    }
]

const poolsOptimism: Pool[] = [
    {
        address: "0x03aF20bDAaFfB4cC0A521796a223f7D85e2aAc31",
        token0: ensure(tokens.find(t=>t.symbol === "WETH" && t.chain.name === "Optimism")),
        token1: ensure(tokens.find(t=>t.symbol === "DAI" && t.chain.name === "Optimism")),
    }
]

const poolsPolygon: Pool[] = [    
    {
        address: "0xa374094527e1673a86de625aa59517c5de346d32",
        token0: ensure(tokens.find(t=>t.symbol === "WMATIC" && t.chain.name === "Polygon")),
        token1: ensure(tokens.find(t=>t.symbol === "USDC" && t.chain.name === "Polygon")),
    }
]

export const pools: Pool[] = poolsEthereum.concat(poolsArbitrum).concat(poolsOptimism).concat(poolsPolygon)