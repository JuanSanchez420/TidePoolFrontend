import { BigNumber } from "ethers"
import { useState } from "react"
import { Token } from "../info/tokens"
import { useTokenContract } from "./useContract"

const useERC20 = (token: Token) => {
    const contract = useTokenContract(token.address)
    
    const allowance = async (owner: string, spender: string): Promise<BigNumber> => {
        let limit = BigNumber.from(0);
        try {
            limit = await contract.allowance(owner, spender)
        } catch(e) {
            console.log(e)
        }
        return limit
    }

    const approve = () => {}

    return { approve, allowance }
}

export default useERC20