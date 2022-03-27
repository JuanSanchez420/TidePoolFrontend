import { BigNumber } from "ethers"
import { useEffect, useState } from "react"
import { TidePool } from "../info/tidePools"
import { useTokenContract } from "./useContract"

interface TidePoolActions {
    tidePool: TidePool
    locked: boolean | undefined
    deposit: (token0Amount: BigNumber, token1Amount: BigNumber) => void
    withdraw: () => void
}

const useTidePool = (tidePool: TidePool): TidePoolActions => {
    const contract = useTokenContract(tidePool.address)
    const [state, setState] = useState<TidePool>(tidePool)
    const [locked, setLocked] = useState<boolean | undefined>()

    useEffect(()=>{
        const f = async () => {
            setLocked(await contract.locked())
        }
        if(locked === undefined) f()
    },[locked])
    
    const approvalLimit = (spender: string): number => {
        return 0
    }

    const deposit = async (token0Amount: BigNumber, token1Amount: BigNumber) => {
        try {
            if(!locked)
                await contract.deposit(token0Amount, token1Amount)
        } catch(e) {
            console.log(e)
        }
        
    }

    const withdraw = async () => {
        try{ 
            if(!locked)
                await contract.withdraw()
        } catch(e) {
            console.log(e)
        }
    }

    return { tidePool, locked, deposit, withdraw }
}

export default useTidePool