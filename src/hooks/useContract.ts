import { useContext, useMemo } from "react"
import {
  TIDEPOOL_ABI,
  UNISWAPPOOL_ABI,
  ERC20_ABI,
  FACTORY_ABI,
} from "../info/abi"
import { Global } from "../context/GlobalContext"
import { getContract } from "viem"
import { usePublicClient, useWalletClient } from "wagmi"

const useContract = (address?: string, abi?: any) => {
  const { loaded, network } = useContext(Global)
  const publicClient = usePublicClient({ chainId: network.chainId })
  const { data: walletClient } = useWalletClient()

  const contract = useMemo(() => {
    if (!loaded || !address || !abi || (!publicClient && !walletClient))
      return null

    return getContract({
      address: address as `0x${string}`,
      abi: [...abi] as const,
      publicClient,
      walletClient: walletClient || undefined,
    })
  }, [publicClient, walletClient, abi, address, loaded])

  return contract
}

export const useTidePoolContract = (address?: string) => {
  return useContract(address, TIDEPOOL_ABI)
}

export const useUniswapPoolContract = (address?: string) => {
  return useContract(address, UNISWAPPOOL_ABI)
}

export const useTokenContract = (address?: string) => {
  return useContract(address, ERC20_ABI)
}

export const useFactoryContract = () => {
  const { network } = useContext(Global)
  return useContract(network.factory, FACTORY_ABI)
}
