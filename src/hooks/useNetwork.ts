import { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { Network, networks } from "../info/networks"
import useLocalStorage from "./useLocalStorage"

const useNetwork = (): Network => {
  const { chainId } = useWeb3React()
  const [previous, setPrevious] = useLocalStorage("network")
  const [network, setNetwork] = useState<Network>(networks[chainId ? chainId : previous ? previous : 1])
  
  useEffect(() => {
    if (chainId) {
      setNetwork(networks[chainId])
      setPrevious(chainId)
    }
  }, [chainId, setPrevious])

  return network
}

export default useNetwork
