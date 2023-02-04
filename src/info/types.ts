import { BigNumber } from "ethers"
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
}

export enum CreateState {
  DOESNT_EXIST,
  PENDING,
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
  sqrtPriceX96: BigNumber
  tick: number
  observationIndex: number
  observationCardinality: number
  observationCardinalityNext: number
  feeProtocol: number
  unlocked: boolean
}

export interface Position {
  liquidity: BigNumber
  tokensOwed0: BigNumber
  tokensOwed1: BigNumber
  feeGrowthInside0LastX128: BigNumber
  feeGrowthInside1LastX128: BigNumber
}
