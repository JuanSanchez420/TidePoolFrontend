import { useState, useEffect, useCallback } from "react"
import { useWeb3React } from "@web3-react/core"
import { Network, networks } from "../info/networks"
import useLocalStorage from "./useLocalStorage"

const useNetwork = (): Network => {
  const { chainId } = useWeb3React()
  const [previous, setPrevious] = useLocalStorage("network")

  const getNetwork = useCallback(() => {
    if (chainId && networks[chainId]) {
      return networks[chainId]
    } else if (previous && networks[previous]) {
      return networks[previous]
    } else {
      return networks[1]
    }
  }, [chainId, previous])

  const [network, setNetwork] = useState<Network>(getNetwork())

  useEffect(() => {
    if (chainId) {
      setNetwork(getNetwork())
      setPrevious(chainId)
    }
  }, [chainId, setNetwork, setPrevious, getNetwork])

  return network
}

export default useNetwork
