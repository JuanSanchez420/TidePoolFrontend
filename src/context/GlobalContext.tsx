import { ethers } from "ethers"
import { createContext, useEffect, useState } from "react"
import { Network, Arbitrum } from "../info/networks"

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
    const [network, setNetwork] = useState<Network>(Arbitrum)
    const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider>(new ethers.providers.JsonRpcProvider(Arbitrum.rpc))
    const [account, setAccount] = useState<string>("")

    useEffect(()=>{
        const s = async () => {
            const accounts = await provider.listAccounts()
            if(accounts.length > 0)
                setAccount(accounts[0])
        }
        if(!account && provider) s()
    },[provider, account])

    return (
        <Global.Provider value={{account, setAccount, network, setNetwork, provider, setProvider}}>
            {children}
        </Global.Provider>
    )
}