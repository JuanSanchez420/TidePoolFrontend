import { useState, useEffect } from "react"
import { Network } from "../info/networks"
import { TheList } from "../info/types"

const useTheList = (network: Network) => {

    const INITIAL_LIST = {
        chainId: network.chainId,
        factory: network.factory,
        tidePools: []
    }

    const [theList, setTheList] = useState<TheList>(INITIAL_LIST)

    useEffect(()=>{
        const f = async () => {
            const response = await fetch(`/${network.chainId}.json`)
            if(response.ok) setTheList(await response.json())
        }
        f()
    },[network])

    return theList
}

export default useTheList