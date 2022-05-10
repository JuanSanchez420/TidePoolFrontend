import { useState, useEffect, useMemo, useCallback } from "react"
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

    const checkAllowance = useCallback(async () => {
        const allowance = await contract.allowance(owner, spender)
        setIsApproved(allowance.gt(0))
    },[contract, owner, spender])

    useEffect(()=>{
        if(owner) checkAllowance()
    },[isApproved, contract, checkAllowance, owner])

    useEffect(()=>{
        const getBalance = async () => {
            setBalance(await contract.balanceOf(owner))
        }
        if(owner) getBalance()
    },[balance, contract, owner])

    return useMemo(()=>{

        const approve = async () => {
            await contract.approve(spender, MAX_UINT256)
            await checkAllowance()
        }

        return {
            isApproved,
            balance,
            approve
        }
    },[isApproved, balance, checkAllowance, contract, spender])
}

export default useToken