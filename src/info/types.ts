import { BigNumber } from "ethers";

export interface Chain {
  id: number;
  rpc: string;
  factory: string;
}

export interface TidePool {
  chainId: number;
  address: string;
  pool: Pool;
}

export interface Pool {
  chainId: number;
  address: string;
  token0: Token;
  token1: Token;
}

export interface Token {
  chainId: number;
  address: string;
  symbol: string;
  decimals: number;
}

export interface TheList {
  chainId: number;
  factory: string;
  tidePools: TidePool[];
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
  sqrtPriceX96: BigNumber;
  tick: number;
  observationIndex: number;
  observationCardinality: number;
  observationCardinalityNext: number;
  feeProtocol: number;
  unlocked: boolean;
}
