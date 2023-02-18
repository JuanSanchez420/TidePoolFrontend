import { useState, useEffect } from "react"
import { DEFAULT_CHAIN_ID, Network, networks } from "../info/networks"
import { TheList } from "../info/types"

const useTheList = (network: Network) => {
  const INITIAL_LIST = {
    chainId: network?.chainId || networks[DEFAULT_CHAIN_ID].chainId,
    factory: network?.factory || networks[DEFAULT_CHAIN_ID].factory,
    tidePools: [],
  }

  const [theList, setTheList] = useState<TheList>(INITIAL_LIST)

  useEffect(() => {
    const f = async () => {
      const response = await fetch(`/${network.chainId}.json`)
      if (response.ok) setTheList(await response.json())
    }
    if (network) f()
  }, [network])

  return theList
}

export default useTheList
