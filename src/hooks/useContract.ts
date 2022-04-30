import { useContext, useMemo } from "react"
import { ethers } from "ethers"
import { TIDEPOOL_ABI, UNISWAPPOOL_ABI, ERC20_ABI } from "../info/abi"
import { Global } from "../context/GlobalContext"

const useContract = (address: string, abi: any): ethers.Contract => {
    const { account, provider } = useContext(Global)
    
    const contract = useMemo(()=>{
        return new ethers.Contract(address, abi, account ? provider.getSigner() : provider)
    },[provider, account])

    return contract
}

export const useTidePoolContract = (address: string): ethers.Contract => {
    return useContract(address, TIDEPOOL_ABI)
}

export const useUniswapPoolContract = (address: string): ethers.Contract => {
    return useContract(address, UNISWAPPOOL_ABI)
}

export const useTokenContract = (address: string): ethers.Contract => {
    return useContract(address, ERC20_ABI)
}