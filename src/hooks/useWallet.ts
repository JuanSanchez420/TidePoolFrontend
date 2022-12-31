import { useCallback } from "react"
import { useWeb3React } from "@web3-react/core"
import { Network as Chain } from "../info/networks"
import {
  metaMask,
  walletConnect,
} from "../utils/web3React"

const useWallet = () => {
  const { connector, isActivating, isActive, chainId } =
    useWeb3React()

  const connect = async (connectorName: "metamask" | "walletconnect") => {
    if (isActive) {
      await connector?.deactivate?.()
    }
    if (connectorName === "metamask") {
      metaMask.activate(chainId).catch((e) => console.log(e))
    }
    if (connectorName === "walletconnect") {
      walletConnect.activate(chainId).catch((e) => console.log(e))
    }
  }

  const disconnect = async () => {
    if(connector.deactivate) {
      connector.deactivate()
    } else {
      connector.resetState()
    }
  }

  const switchNetwork = useCallback(
    async (network: Chain) => {
        connector.activate(network.chainId)
    },
    [connector]
  )

  return {
    switchNetwork,
    connect,
    disconnect
  }
}

export default useWallet
