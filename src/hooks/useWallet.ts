import { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { connectors } from "../utils/web3React"
import { Network } from "../info/networks"

declare global {
  interface Window {
    ethereum: any
  }
}

const useWallet = () => {
  const { activate, active, library, error } = useWeb3React()
  const injected = connectors["injected"]
  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })
  }, [activate, injected])

  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  useEffect(()=>{
    if(error && error.name === "UnsupportedChainIdError") {
      alert("Please switch to a supported chain: Ethereum, Arbitrum, Optimism, or Polygon.")
    }
  },[error])

  const handleActivate = () => {
    activate(connectors.injected, undefined, false)
  }

  const switchNetwork = async (network: Network) => {
    try {
      await library?.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(network.chainId).toString(16)}` }]
      });
    } catch (switchError: any) {
      console.log(switchError)
      if (switchError.code === 4902) {
        try {
          await library?.provider.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: `0x${Number(1).toString(16)}`,
              rpcUrls: [network.rpcPublic],
              chainName: network.name,
              nativeCurrency: network.nativeCurrency,
              blockExplorerUrls: [network.blockExplorer],
              iconUrls: [network.icon]
            }]
          });
        } catch (error) {
          // w/e
        }
      }
    }
  }

  return { 
    tried,
    handleActivate,
    switchNetwork
  }
}

export default useWallet
