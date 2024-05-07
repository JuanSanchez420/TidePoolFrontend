import { configureChains, createConfig, mainnet } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import { arbitrum, optimism, polygon, bsc } from "@wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { Arbitrum, Ethereum, Optimism, Polygon, BSC } from "../info/networks"

const useWagmi = () => {
  const { chains, publicClient } = configureChains(
    [mainnet, arbitrum, polygon, optimism, bsc],
    [
      jsonRpcProvider({
        rpc: (chain) => ({
          http:
            chain.id === 1
              ? Ethereum.rpc
              : chain.id === 137
              ? Polygon.rpc
              : chain.id === 10
              ? Optimism.rpc
              : chain.id === 56
              ? BSC.rpcPublic
              : Arbitrum.rpc,
        }),
      }),
      publicProvider(),
    ]
  )

  const config = createConfig({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: "0b088df2dc8b35cac08adb81a99c694c",
        },
      }),
    ],
    publicClient,
  })

  return config
}

export default useWagmi
