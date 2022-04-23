export interface Network {
    name: string,
    rpc: string,
    chainId: number,
    image: string,
    blockExplorer: string
}

export const Ethereum: Network = {
    name: "Ethereum",
    rpc: "https://mainnet.infura.io/v3/8c8620ccdccd4d10a4ce8b5786d4659f",
    chainId: 1,
    image:"/images/ethereum.png",
    blockExplorer: "https://etherscan.io/",
  }
  
export const Arbitrum: Network = {
    name: "Arbitrum",
    rpc: "https://arbitrum-mainnet.infura.io/v3/8c8620ccdccd4d10a4ce8b5786d4659f",
    chainId: 42161,
    image:"/images/arbitrum.svg",
    blockExplorer: "https://arbiscan.io/"
  }
  
export const Optimism: Network = {
    name: "Optimism",
    rpc: "https://optimism-mainnet.infura.io/v3/8c8620ccdccd4d10a4ce8b5786d4659f",
    chainId: 10,
    image:"/images/optimism.svg",
    blockExplorer: "https://optimistic.etherscan.io/"
  }

  export const Polygon: Network = {
    name: "Polygon",
    rpc: "https://polygon-mainnet.infura.io/v3/8c8620ccdccd4d10a4ce8b5786d4659f",
    chainId: 137,
    image:"/images/polygon.svg",
    blockExplorer: "https://polygonscan.com/"
  }

  export const Localhost: Network = {
    name: "Localhost",
    rpc: "http://localhost:8545",
    chainId: 1337,
    image:"/images/crab.png",
    blockExplorer: "https://polygonscan.com/"
  }
  
export const networks: Network[] = [
    Ethereum, Arbitrum, Optimism, Polygon, Localhost
]
