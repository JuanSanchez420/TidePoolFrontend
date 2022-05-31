export interface Chain {
    id: number
    rpc: string
    factory: string
}

export interface TidePool {
    chainId: number
    address: string
    pool: Pool
}

export interface Pool {
    chainId: number
    address: string
    token0: Token
    token1: Token
}

export interface Token {
    chainId: number
    address: string
    symbol: string
    decimals: number
}

export interface TheList {
    chainId: number
    factory: string
    tidePools: TidePool[]
}

export const dummyTidePool: TidePool = {
    chainId: 1,
    address: "0x0",
    pool: {
        chainId: 1,
        address: "0x0",
        token0: {
            chainId: 1,
            address: "0x0",
            symbol: "N/A",
            decimals: 18
        },
        token1: {
            chainId: 1,
            address: "0x0",
            symbol: "N/A",
            decimals: 18
        }
    }
}