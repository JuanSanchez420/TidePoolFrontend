import { useState, useEffect, useMemo, useCallback } from "react"
import { useTokenContract } from "./useContract"
import { MAX_UINT256 } from "../info/constants"
import { BigNumber } from "ethers"
import { ApprovalState } from "../info/types"

interface TokenUtils {
  state: ApprovalState
  balance: BigNumber
  approve: () => Promise<void>
}

const useToken = (
  tokenAddress?: string,
  owner?: string,
  spender?: string
): TokenUtils => {
  const [state, setState] = useState<ApprovalState>(ApprovalState.NOT_APPROVED)
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))
  const contract = useTokenContract(tokenAddress)

  const checkAllowance = useCallback(async () => {
    const allowance = await contract?.allowance(owner, spender)
    setState(
      allowance.gt(0) ? ApprovalState.APPROVED : ApprovalState.NOT_APPROVED
    )
  }, [contract, owner, spender])

  useEffect(() => {
    if (owner) checkAllowance()
  }, [state, contract, checkAllowance, owner])

  useEffect(() => {
    const getBalance = async () => {
      setBalance(await contract?.balanceOf(owner))
    }
    if (owner) getBalance()
  }, [balance, contract, owner])

  return useMemo(() => {
    const approve = async () => {
      await contract?.approve(spender, MAX_UINT256)
      await checkAllowance()
    }

    return {
      state,
      balance,
      approve,
    }
  }, [state, balance, checkAllowance, contract, spender])
}

export default useToken
