import { configureChains, createClient, mainnet } from "wagmi"
import { infuraProvider } from "wagmi/providers/infura"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import { arbitrum, optimism, polygon } from "@wagmi/chains"
import { INFURA_KEY } from "../info/constants"
// import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"

const useWagmi = () => {
  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet, arbitrum, polygon, optimism],
    [
      infuraProvider({ apiKey: INFURA_KEY }),
      jsonRpcProvider({
        rpc: (chain) => ({
          http:
            chain.id === 1
              ? `https://mainnet.infura.io/v3/${INFURA_KEY}`
              : chain.id === 137
              ? `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`
              : chain.id === 10
              ? `https://optimism-mainnet.infura.io/v3/${INFURA_KEY}`
              : `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}`,
        }),
      }),
    ]
  )

  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
    ],
    provider,
    webSocketProvider,
  })

  return client
}

export default useWagmi
