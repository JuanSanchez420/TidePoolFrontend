import { useState, useEffect, useMemo } from "react"
import { useTokenContract } from "./useContract"
import { MAX_UINT256 } from "../info/constants"
import { BigNumber } from "ethers"

interface TokenUtils {
    isApproved: boolean
    balance: BigNumber
    approve: () => Promise<void>
}

const useToken = (tokenAddress: string, owner: string, spender: string): TokenUtils => {
    const [isApproved, setIsApproved] = useState<boolean>(false)
    const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))
    const contract = useTokenContract(tokenAddress)

    const approve = async () => {
        await contract.approve(spender, MAX_UINT256)
    }

    useEffect(()=>{
        const check = async ()=> {
            const allowance = await contract.allowance(owner, spender)
            setIsApproved(allowance.gt(0))
        }
        check()
    },[isApproved, contract])

    useEffect(()=>{
        const getBalance = async () => {
            setBalance(await contract.balanceOf(owner))
        }
        getBalance()
    },[balance, contract])

    return useMemo(()=>{
        return {
            isApproved,
            balance,
            approve
        }
    },[isApproved, balance, approve])
}

export default useToken