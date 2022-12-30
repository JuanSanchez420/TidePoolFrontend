import { createContext, SetStateAction } from "react"
import useTheList from "../hooks/useTheList"
import { TheList } from "../info/types"
import useNetwork from "../hooks/useNetwork"
import { Network } from "../info/networks"

interface IGlobalContext {
  theList: TheList
  network: Network
  setNetwork: React.Dispatch<SetStateAction<Network>>
}

export const Global = createContext<IGlobalContext>({} as IGlobalContext)

export const GlobalContext: React.FC = ({ children }) => {
  const { network, setNetwork } = useNetwork()
  const theList = useTheList(network)

  return (
    <Global.Provider
      value={{
        theList,
        network,
        setNetwork
      }}
    >
      {children}
    </Global.Provider>
  )
}
