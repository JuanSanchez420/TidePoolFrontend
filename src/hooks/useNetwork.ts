import { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { Ethereum, Network, networks } from "../info/networks"

const useNetwork = (): Network => {
  const { chainId } = useWeb3React()
  const [network, setNetwork] = useState<Network>(Ethereum)

  useEffect(() => {
    if (chainId) setNetwork(networks[chainId])
  }, [chainId])

  return network
}

export default useNetwork
