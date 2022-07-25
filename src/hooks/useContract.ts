import { useContext, useMemo } from "react";
import { ethers } from "ethers";
import {
  TIDEPOOL_ABI,
  UNISWAPPOOL_ABI,
  ERC20_ABI,
  FACTORY_ABI,
} from "../info/abi";
import { Global } from "../context/GlobalContext";

const useContract = (address?: string, abi?: any): ethers.Contract | null => {
  const { account, provider } = useContext(Global);

  const contract = useMemo(() => {
    if (!address || !abi) return null;
    return new ethers.Contract(
      address,
      abi,
      account ? provider.getSigner() : provider
    );
  }, [provider, account, abi, address]);

  return contract;
};

export const useTidePoolContract = (
  address?: string
): ethers.Contract | null => {
  return useContract(address, TIDEPOOL_ABI);
};

export const useUniswapPoolContract = (
  address?: string
): ethers.Contract | null => {
  return useContract(address, UNISWAPPOOL_ABI);
};

export const useTokenContract = (address?: string): ethers.Contract | null => {
  return useContract(address, ERC20_ABI);
};

export const useFactoryContract = (): ethers.Contract | null => {
  const { network } = useContext(Global);

  return useContract(network.factory, FACTORY_ABI);
};
