import { ethers } from "ethers"
import { createContext, useState } from "react"
import { Network, Arbitrum } from "../info/networks"

interface IGlobalContext {
    network: Network
    setNetwork: (network: Network) => void
    provider: ethers.providers.JsonRpcProvider
    setProvider: (provider: ethers.providers.JsonRpcProvider) => void
    signer: ethers.providers.JsonRpcSigner | undefined
    setSigner: (signer: ethers.providers.JsonRpcSigner) => void
}

export const Global = createContext<IGlobalContext | null>(null)

export const GlobalContext: React.FC = ({children}) => {
    const [network, setNetwork] = useState<Network>(Arbitrum)
    const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider>(new ethers.providers.JsonRpcProvider(network.rpc))
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | undefined>()

    return (
        <Global.Provider value={{network, setNetwork, provider, setProvider, signer, setSigner}}>
            {children}
        </Global.Provider>
    )
}