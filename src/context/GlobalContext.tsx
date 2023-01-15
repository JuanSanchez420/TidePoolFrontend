import { createContext, useState } from "react"
import { useNetwork } from "wagmi"
import useTheList from "../hooks/useTheList"
import { networks, Network } from "../info/networks"
import { TheList } from "../info/types"

interface IGlobalContext {
  theList: TheList
  network: Network
  setDefaultNetwork: (network: number) => void
  loaded: boolean
}

export const Global = createContext<IGlobalContext>({} as IGlobalContext)

export const GlobalContext: React.FC = ({ children }) => {
  const { chain } = useNetwork()
  const [defaultNetwork, setDefaultNetwork] = useState<number>(1)
  const network = networks[chain?.id || defaultNetwork]
  const theList = useTheList(network)
  const loaded = theList.chainId === network.chainId

  return (
    <Global.Provider
      value={{
        theList,
        network,
        setDefaultNetwork,
        loaded
      }}
    >
      {children}
    </Global.Provider>
  )
}
