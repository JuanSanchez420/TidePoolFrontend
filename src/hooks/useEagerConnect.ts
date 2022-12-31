import { useWeb3React } from "@web3-react/core"
import { useEffect, useRef } from "react"
import useLocalStorage from "./useLocalStorage"
import {
  network,
  metaMask,
  walletConnect,
} from "../utils/web3React"
import { Ethereum } from "../info/networks"

const useEagerConnect = () => {
  const { isActivating, isActive } = useWeb3React()
  const [walletconnect, , ] = useLocalStorage("walletconnect")
  const firstLoad = useRef(false)

  useEffect(() => {
    if (!isActive && !isActivating) {
      if (window?.ethereum?.isMetaMask) {
        metaMask.connectEagerly().catch(() => {
          console.debug("Failed to connect eagerly to metamask")
        })
      } else if (walletconnect?.connected) {
        walletConnect.connectEagerly().catch(() => {
          console.debug("Failed to connect eagerly to walletconnect")
        })
      } else {
        network?.activate(Ethereum.chainId)
      }
      firstLoad.current = false
    }
  }, [isActive, isActivating, walletconnect])
}

export default useEagerConnect
