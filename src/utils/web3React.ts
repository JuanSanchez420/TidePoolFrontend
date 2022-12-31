import { initializeConnector, Web3ReactHooks } from "@web3-react/core"
import { MetaMask } from "@web3-react/metamask"
import { Network } from "@web3-react/network"
import { WalletConnect } from "@web3-react/walletconnect"
import { Ethereum, Arbitrum, Optimism, Polygon } from "../info/networks"

const URLS: { [chainId: number]: string[] } = {
  [Ethereum.chainId]: [Ethereum.rpc],
  [Arbitrum.chainId]: [Arbitrum.rpc],
  [Optimism.chainId]: [Optimism.rpc],
  [Polygon.chainId]: [Polygon.rpc],
}

export const [network, networkHooks] = initializeConnector<Network>(
  (actions) => new Network({ actions, urlMap: URLS })
)
export const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions })
)
export const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        rpc: URLS,
        bridge: 'https://bridge.walletconnect.org',
      },
    })
)

export const connectors: [
  Network | MetaMask | WalletConnect,
  Web3ReactHooks
][] = [
  [network, networkHooks],
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks]
]