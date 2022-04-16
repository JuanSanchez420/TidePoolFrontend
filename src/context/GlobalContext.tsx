import { ethers } from "ethers"
import { createContext, useEffect, useState, useRef } from "react"
import { Network, Ethereum } from "../info/networks"

interface IGlobalContext {
    account: string
    setAccount: (account: string) => void
    network: Network
    setNetwork: (network: Network) => void
    provider: ethers.providers.JsonRpcProvider
    setProvider: (provider: ethers.providers.JsonRpcProvider) => void
}

export const Global = createContext<IGlobalContext>({} as IGlobalContext)

export const GlobalContext: React.FC = ({children}) => {
    const [network, setNetwork] = useState<Network>(Ethereum)
    const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider>(new ethers.providers.JsonRpcProvider(Ethereum.rpc))
    const [account, setAccount] = useState<string>("")

    return (
        <Global.Provider value={{account, setAccount, network, setNetwork, provider, setProvider}}>
            {children}
        </Global.Provider>
    )
}