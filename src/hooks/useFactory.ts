import React, { useEffect, useMemo, useCallback, useState, useContext } from "react"
import { useFactoryContract } from "./useContract"
import ethers from "ethers"
import { Global } from "../context/GlobalContext"
import { getFactory } from "../info/factory"

const useFactory = () => {
    const { network } = useContext(Global)
    const [tps, setTps] = useState<string[]>([])
    const factory = getFactory(network.chainId)
    const contract = useFactoryContract()

    useEffect(()=>{
        const fetch = async () => {
            const filter = contract.filters.TidePoolCreated()
            
            const events: ethers.Event[] = await contract.queryFilter(filter, factory.block, "latest")
            for(const e of events) {
                console.log(e.args?.tidePool)
            }
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