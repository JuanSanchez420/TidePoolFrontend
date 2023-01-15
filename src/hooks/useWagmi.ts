import { configureChains, createClient, mainnet } from "wagmi"
import { infuraProvider } from "wagmi/providers/infura"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import { arbitrum, optimism, polygon } from "@wagmi/chains"
import { INFURA_KEY } from "../info/constants"

const useWagmi = () => {
  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet, arbitrum, polygon, optimism],
    [infuraProvider({ apiKey: INFURA_KEY })]
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
