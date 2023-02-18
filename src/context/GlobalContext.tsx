import { createContext, useState } from "react"
import { useNetwork } from "wagmi"
import useTheList from "../hooks/useTheList"
import { networks, Network, DEFAULT_CHAIN_ID } from "../info/networks"
import { TheList } from "../info/types"

interface IGlobalContext {
  theList: TheList
  network: Network
  setDefaultNetwork: (network: number) => void
  loaded: boolean
}

export const Global = createContext<IGlobalContext>({} as IGlobalContext)

export const GlobalContext: React.FC = ({
  children,
}: {
  children?: React.ReactNode
}) => {
  const { chain } = useNetwork()
  const [defaultNetwork, setDefaultNetwork] = useState<number>(DEFAULT_CHAIN_ID)
  const network =
    networks[chain && !chain.unsupported ? chain.id : defaultNetwork]
  const theList = useTheList(network)
  const loaded = theList.chainId === (network?.chainId || defaultNetwork)

  return (
    <Global.Provider
      value={{
        theList,
        network,
        setDefaultNetwork,
        loaded,
      }}
    >
      {children}
    </Global.Provider>
  )
}
