export interface Network {
  name: string
  rpc: string
  chainId: number
  image: string
  blockExplorer: string
  factory: string
}

export const Ethereum: Network = {
  name: "Ethereum",
  rpc: "https://mainnet.infura.io/v3/8c8620ccdccd4d10a4ce8b5786d4659f",
  chainId: 1,
  image: "/images/ethereum.png",
  blockExplorer: "https://etherscan.io/",
  factory: "0xA2D974Be6Aa43D38c087E9De221801BACCAB252B",
}

export const Arbitrum: Network = {
  name: "Arbitrum",
  rpc: "https://arbitrum-mainnet.infura.io/v3/8c8620ccdccd4d10a4ce8b5786d4659f",
  chainId: 42161,
  image: "/images/arbitrum.svg",
  blockExplorer: "https://arbiscan.io/",
  factory: "0xc28EaA5051C0cfB8A493749990787d0190e8300F",
}

export const Optimism: Network = {
  name: "Optimism",
  rpc: "https://optimism-mainnet.infura.io/v3/8c8620ccdccd4d10a4ce8b5786d4659f",
  chainId: 10,
  image: "/images/optimism.svg",
  blockExplorer: "https://optimistic.etherscan.io/",
  factory: "0xA2D974Be6Aa43D38c087E9De221801BACCAB252B",
}

export const Polygon: Network = {
  name: "Polygon",
  rpc: "https://polygon-mainnet.infura.io/v3/8c8620ccdccd4d10a4ce8b5786d4659f",
  chainId: 137,
  image: "/images/polygon.svg",
  blockExplorer: "https://polygonscan.com/",
  factory: "0x59b81A9B35d94000F40C3e0e7894D7762A526a36",
}

export const networks = {
  [Ethereum.chainId]: Ethereum,
  [Arbitrum.chainId]: Arbitrum,
  [Optimism.chainId]: Optimism,
  [Polygon.chainId]: Polygon,
}
