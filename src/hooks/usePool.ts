import { useState, useEffect, useRef } from "react"
import { useUniswapPoolContract } from "./useContract"
import { Slot0 } from "../info/types"

const usePool = (address?: string) => {
    const contract = useUniswapPoolContract(address)
    const [slot0, setSlot0] = useState<Slot0 | null>(null)

    useEffect(()=>console.log(slot0),[slot0])

    useEffect(()=>{
        const fetch = async () => {
            setSlot0(await contract?.slot0())
        }
        fetch()
    },[contract])

    return {
        slot0
    }
}

export default usePool