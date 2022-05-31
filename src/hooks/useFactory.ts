import React, { useEffect, useMemo, useCallback, useState, useContext } from "react"
import { useFactoryContract } from "./useContract"
import ethers from "ethers"
import { Global } from "../context/GlobalContext"

const useFactory = () => {
    const { network } = useContext(Global)
    const contract = useFactoryContract()

    const deploy = useCallback(async (address: string)=>{
        try {
            const tx = await contract.deploy(address)
            await tx.wait()
        } catch(e) {
            console.log(e)
        }
    },[contract])

    return {
        deploy
    }
}

export default useFactory