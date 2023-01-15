import { useContext, useMemo } from "react"
import { ethers } from "ethers"
import {
  TIDEPOOL_ABI,
  UNISWAPPOOL_ABI,
  ERC20_ABI,
  FACTORY_ABI,
} from "../info/abi"
import { useProvider } from "wagmi"
import { useSigner } from "wagmi"
import { Global } from "../context/GlobalContext"

const useContract = (address?: string, abi?: any): ethers.Contract | null => {
  const { loaded, network } = useContext(Global)
  const provider = useProvider({ chainId: network.chainId })
  const { data: signer } = useSigner()

  const contract = useMemo(() => {
    if (!loaded || !address || !abi || (!provider && !signer)) return null

    return new ethers.Contract(address, abi, signer ?? provider)
  }, [provider, signer, abi, address, loaded])

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
  const { network } = useContext(Global)
  return useContract(network.factory, FACTORY_ABI)
}
