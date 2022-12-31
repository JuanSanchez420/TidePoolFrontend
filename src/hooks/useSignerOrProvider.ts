import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

const useSignerOrProvider = () => {
  const { account, connector } = useWeb3React()
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | ethers.Signer | undefined
  >(undefined)

  useEffect(() => {
    if (connector?.provider) {
      const provider = new ethers.providers.Web3Provider(connector.provider)
      const signer = account ? provider.getSigner(account) : undefined
      setProvider(signer ?? provider)
    }
  }, [connector, account])

  return provider
}

export default useSignerOrProvider
