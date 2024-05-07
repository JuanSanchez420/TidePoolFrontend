import { useState, useEffect, useCallback } from "react"
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

  const update = useCallback(async () => {
    const response = await fetch(`/${network.chainId}.json?v=${Date.now()}`)
    if (response.ok) setTheList({ ...(await response.json()), update })
  }, [network])

  useEffect(() => {
    if (isMounted && network && update) update()
  }, [isMounted, network, update])

  return theList
}

export default useTheList
