import { Token } from "@uniswap/sdk-core"

export interface Network {
  name: string
  rpc: string
  rpcPublic: string
  chainId: number
  image: string
  blockExplorer: string
  factory: string
  subgraph: string
  nativeCurrency: {
    name: string
    decimals: number
    symbol: string
  }
  icon: string
  ETHUSD: string
  WETH: Token
  USDC: Token
}

export const Ethereum: Network = {
  name: "Ethereum",
  rpc: "https://mainnet.infura.io/v3/8c8620ccdccd4d10a4ce8b5786d4659f",
  rpcPublic: "https://rpc.ankr.com/eth",
  chainId: 1,
  image: "/images/ethereum.png",
  blockExplorer: "https://etherscan.io/",
  factory: "0xA2D974Be6Aa43D38c087E9De221801BACCAB252B",
  subgraph: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  nativeCurrency: {
    name: "Ether",
    decimals: 18,
    symbol: "ETH",
  },
  icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
  ETHUSD: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640",
  WETH: new Token(
    1,
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    18,
    "WETH",
    "Wrapped Ether"
  ),
  USDC: new Token(
    1,
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    6,
    "USDC",
    "USD Coin"
  ),
}

export const Arbitrum: Network = {
  name: "Arbitrum",
  rpc: "https://arbitrum-mainnet.infura.io/v3/8c8620ccdccd4d10a4ce8b5786d4659f",
  rpcPublic: "",
  chainId: 42161,
  image: "/images/arbitrum.svg",
  blockExplorer: "https://arbiscan.io/",
  factory: "0xc28EaA5051C0cfB8A493749990787d0190e8300F",
  subgraph: "https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-dev",
  nativeCurrency: {
    name: "Ether",
    decimals: 18,
    symbol: "ETH",
  },
  icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
  ETHUSD: "0xC31E54c7a869B9FcBEcc14363CF510d1c41fa443",
  WETH: new Token(
    42161,
    "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    18,
    "WETH",
    "Wrapped Ether"
  ),
  USDC: new Token(
    42161,
    "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    6,
    "USDC",
    "USD Coin"
  ),
}

export const Optimism: Network = {
  name: "Optimism",
  rpc: "https://optimism-mainnet.infura.io/v3/8c8620ccdccd4d10a4ce8b5786d4659f",
  rpcPublic: "https://mainnet.optimism.io",
  chainId: 10,
  image: "/images/optimism.svg",
  blockExplorer: "https://optimistic.etherscan.io/",
  factory: "0xA2D974Be6Aa43D38c087E9De221801BACCAB252B",
  subgraph:
    "https://api.thegraph.com/subgraphs/name/ianlapham/optimism-post-regenesis",
  nativeCurrency: {
    name: "Ether",
    decimals: 18,
    symbol: "ETH",
  },
  icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
  ETHUSD: "0x85149247691df622eaF1a8Bd0CaFd40BC45154a9",
  WETH: new Token(
    10,
    "0x4200000000000000000000000000000000000006",
    18,
    "WETH",
    "Wrapped Ether"
  ),
  USDC: new Token(
    10,
    "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    6,
    "USDC",
    "USD Coin"
  ),
}

export const Polygon: Network = {
  name: "Polygon",
  rpc: "https://polygon-mainnet.infura.io/v3/8c8620ccdccd4d10a4ce8b5786d4659f",
  rpcPublic: "	https://polygon-rpc.com/",
  chainId: 137,
  image: "/images/polygon.svg",
  blockExplorer: "https://polygonscan.com/",
  factory: "0x59b81A9B35d94000F40C3e0e7894D7762A526a36",
  subgraph:
    "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon",
  nativeCurrency: {
    name: "MATIC",
    decimals: 18,
    symbol: "MATIC",
  },
  icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png",
  ETHUSD: "0x45dDa9cb7c25131DF268515131f647d726f50608",
  WETH: new Token(
    137,
    "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    18,
    "WETH",
    "Wrapped Ether"
  ),
  USDC: new Token(
    137,
    "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    6,
    "USDC",
    "USD Coin"
  ),
}

export const networks = {
  [Ethereum.chainId]: Ethereum,
  [Arbitrum.chainId]: Arbitrum,
  [Optimism.chainId]: Optimism,
  [Polygon.chainId]: Polygon,
}
