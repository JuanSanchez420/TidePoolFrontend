import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { ethers } from "ethers"
import { Ethereum, Arbitrum, Optimism, Polygon } from "../info/networks"

const POLLING_INTERVAL = 12000

export const injected = new InjectedConnector({
  supportedChainIds: [
    Ethereum.chainId,
    Arbitrum.chainId,
    Optimism.chainId,
    Polygon.chainId,
  ],
})

const walletconnect = new WalletConnectConnector({
  rpc: {
    [Ethereum.chainId]: Ethereum.rpc,
    [Arbitrum.chainId]: Arbitrum.rpc,
    [Optimism.chainId]: Optimism.rpc,
    [Polygon.chainId]: Polygon.rpc,
  },
  qrcode: true,
})

export const connectors: {
  injected: InjectedConnector
  walletconnect: WalletConnectConnector
} = {
  injected: injected,
  walletconnect: walletconnect,
}

export const getLibrary = (
  provider:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc
): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}