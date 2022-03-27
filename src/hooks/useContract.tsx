import { useContext } from "react"
import { ethers } from "ethers"
import { TIDEPOOL_ABI, UNISWAPPOOL_ABI, ERC20_ABI } from "../info/abi"
import { Global } from "../context/GlobalContext"

const useContract = (address: string, abi: any): ethers.Contract => {
    const { provider } = useContext(Global)
    const c = new ethers.Contract(address, abi, provider)
    return c
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