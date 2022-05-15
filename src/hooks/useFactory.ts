import React, { useEffect, useMemo, useCallback, useState, useContext } from "react"
import { useFactoryContract } from "./useContract"
import ethers from "ethers"

const useFactory = () => {
    const [tps, setTps] = useState<string[]>([])
    const contract = useFactoryContract()

    useEffect(()=>{
        const fetch = async () => {
            const filter = contract.filters.TidePoolCreated()
            
            const events: ethers.Event[] = await contract.queryFilter(filter, 28342410, "latest")
            console.log(events)
        }
        if(contract) fetch()
    },[contract])

    const deploy = useCallback(async (address: string)=>{
        try {
            const tx = await contract.deploy(address)
            await tx.wait()
        } catch(e) {
            console.log(e)
        }
    },[contract])

    return {
        deploy,
        tps
    }
}

export default useFactory