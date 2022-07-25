import { useState, useEffect } from "react";
import { useTidePoolContract } from "./useContract";
import { BigNumber } from "ethers";

const useTidePool = (address?: string, user?: string) => {
  const contract = useTidePoolContract(address);
  const [balance, setBalance] = useState(BigNumber.from(0));
  const [pool, setPool] = useState<string | null>(null);
  const [token0, setToken0] = useState<string | null>(null);
  const [token1, setToken1] = useState<string | null>(null);
  const [upper, setUpper] = useState<BigNumber>(BigNumber.from(0));
  const [lower, setLower] = useState<BigNumber>(BigNumber.from(0));

  // TODO: multicall
  useEffect(() => {
    const fetch = async () => {
      setPool(await contract?.pool());
      setToken0(await contract?.token0());
      setToken1(await contract?.token1());
      setUpper(await contract?.upper());
      setLower(await contract?.lower());
    };
    if (address) fetch();
  }, [contract]);

  useEffect(() => {
    const getBalance = async () => {
      setBalance(await contract?.balanceOf(user));
    };
    if (user) getBalance();
  }, [contract, user]);

  const deposit = async (zero: BigNumber, one: BigNumber) => {
    try {
      await contract?.deposit(zero, one);
    } catch (e) {
      console.log(e);
    }
  };

  const withdraw = async () => {
    try {
      await contract?.withdraw();
    } catch (e) {
      console.log(e);
    }
  };

  return {
    pool,
    balance,
    deposit,
    withdraw,
    contract,
  };
};

export default useTidePool;
