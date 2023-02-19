import { useState, useEffect } from "react"
import { DEFAULT_CHAIN_ID, Network, networks } from "../info/networks"
import { TheList } from "../info/types"
import { useIsMounted } from "./useIsMounted"

const useTheList = (network: Network) => {
  const isMounted = useIsMounted()
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
    if (isMounted && network) f()
  }, [isMounted, network])

  return theList
}

export default useTheList
