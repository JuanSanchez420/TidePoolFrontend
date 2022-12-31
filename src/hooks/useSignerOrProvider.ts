import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import useNetwork from "./useNetwork"

const useSignerOrProvider = () => {
  const { account, connector } = useWeb3React()
  const network = useNetwork()
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | ethers.Signer | undefined
  >(undefined)

  useEffect(() => {
    if (connector?.provider) {
      const provider = new ethers.providers.Web3Provider(connector.provider)
      const signer = account ? provider.getSigner(account) : undefined
      setProvider(signer ?? provider)
    } else {
      const provider = new ethers.providers.JsonRpcProvider(network.rpc)
      setProvider(provider)
    }
  }, [connector, account, network])

  return provider
}

export default useSignerOrProvider
