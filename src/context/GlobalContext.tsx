import { createContext } from "react"
import useTheList from "../hooks/useTheList"
import { TheList } from "../info/types"
import useNetwork from "../hooks/useNetwork"

interface IGlobalContext {
  theList: TheList
}

export const Global = createContext<IGlobalContext>({} as IGlobalContext)

export const GlobalContext: React.FC = ({ children }) => {
  const network = useNetwork()
  const theList = useTheList(network)

  return (
    <Global.Provider
      value={{
        theList,
      }}
    >
      {children}
    </Global.Provider>
  )
}
