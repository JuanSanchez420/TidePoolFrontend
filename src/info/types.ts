import { Pool } from "@uniswap/v3-sdk"

export interface Chain {
  id: number
  rpc: string
  factory: string
}

export interface TidePool {
  chainId: number
  address: string
  pool: Pool
  poolAddress: string
  APR: string
}

export interface TheList {
  chainId: number
  factory: string
  tidePools: TidePool[]
  update?: () => void
}

export enum CreateState {
  DOESNT_EXIST,
  PENDING,
  UPDATING_API,
  ERROR,
  DONE,
}

export enum ApprovalState {
  NOT_APPROVED,
  PENDING,
  APPROVED,
  ERROR,
}

export interface Slot0 {
  sqrtPriceX96: bigint
  tick: number
  observationIndex: number
  observationCardinality: number
  observationCardinalityNext: number
  feeProtocol: number
  unlocked: boolean
}

export interface Position {
  liquidity: bigint
  tokensOwed0: bigint
  tokensOwed1: bigint
  feeGrowthInside0LastX128: bigint
  feeGrowthInside1LastX128: bigint
}
