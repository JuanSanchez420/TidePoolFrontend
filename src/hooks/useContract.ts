import { useMemo } from "react"
import { ethers } from "ethers"
import {
  TIDEPOOL_ABI,
  UNISWAPPOOL_ABI,
  ERC20_ABI,
  FACTORY_ABI,
} from "../info/abi"
import { useWeb3React } from "@web3-react/core"
import useNetwork from "./useNetwork"

const useContract = (address?: string, abi?: any): ethers.Contract | null => {
  const { account, library } = useWeb3React()

  const contract = useMemo(() => {
    if (!address || !abi) return null
    return new ethers.Contract(
      address,
      abi,
      account ? library.getSigner() : library
    )
  }, [library, account, abi, address])

  return contract
}

export const useTidePoolContract = (
  address?: string
): ethers.Contract | null => {
  return useContract(address, TIDEPOOL_ABI)
}

export const useUniswapPoolContract = (
  address?: string
): ethers.Contract | null => {
  return useContract(address, UNISWAPPOOL_ABI)
}

export const useTokenContract = (address?: string): ethers.Contract | null => {
  return useContract(address, ERC20_ABI)
}

export const useFactoryContract = (): ethers.Contract | null => {
  const network = useNetwork()

  return useContract(network.factory, FACTORY_ABI)
}
