import { Network, Ethereum, Optimism, Polygon, Arbitrum } from "./networks"

export interface Token {
    address: string,
    symbol: string,
    decimals: number,
    chain: Network
  }

interface ImageUrls {
  [key: string]: string
}

export const imageUrls: ImageUrls = {
  WETH: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  USDC: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  DAI: "https://assets.trustwalletapp.com/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
  WMATIC: "https://assets.trustwalletapp.com/blockchains/polygon/assets/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270/logo.png"
}

const tokensEthereum: Token[] = [
    {
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      symbol: "WETH",
      decimals: 18,
      chain: Ethereum
    },
    {
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      symbol: "USDC",
      decimals: 6,
      chain: Ethereum  
    }
  ]

const tokensArbitrum: Token[] = [
  {
    address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    symbol: "WETH",
    decimals: 18,
    chain: Arbitrum
  },
  {
    address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    symbol: "USDC",
    decimals: 6,
    chain: Arbitrum
  }
]

const tokensOptimism: Token[] = [
  {
    address: "0x4200000000000000000000000000000000000006",
    symbol: "WETH",
    decimals: 18,
    chain: Optimism
  },
  {
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    symbol: "DAI",
    decimals: 18,
    chain: Optimism
  }
]

const tokensPolygon: Token[] = [
  {
    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    symbol: "WMATIC",
    decimals: 18,
    chain: Polygon
  },
  {
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    symbol: "USDC",
    decimals: 6,
    chain: Polygon
  },
  {
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    symbol: "WETH",
    decimals: 18,
    chain: Polygon
  },
  {
    address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
    symbol: "WBTC",
    decimals: 8,
    chain: Polygon
  },
  {
    address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    symbol: "DAI",
    decimals: 18,
    chain: Polygon
  }
]

export const tokens: Token[] = tokensEthereum.concat(tokensArbitrum).concat(tokensOptimism).concat(tokensPolygon)