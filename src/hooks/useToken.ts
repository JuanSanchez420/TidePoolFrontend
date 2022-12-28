import { useState, useEffect, useMemo, useCallback, useContext } from "react"
import { useTokenContract } from "./useContract"
import { MAX_UINT256 } from "../info/constants"
import { BigNumber } from "ethers"
import { ApprovalState } from "../info/types"
import { Token } from "@uniswap/sdk-core"
import { Global } from "../context/GlobalContext"

interface TokenUtils {
  token: Token | undefined
  tokens: Token[]
  state: ApprovalState
  balance: BigNumber
  approve: () => Promise<void>
}

const useToken = (
  tokenAddress?: string,
  owner?: string | null,
  spender?: string
): TokenUtils => {
  const [tokens, setTokens] = useState<Token[]>([])
  const [token, setToken] = useState<Token | undefined>()
  const [state, setState] = useState<ApprovalState>(ApprovalState.NOT_APPROVED)
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))
  const contract = useTokenContract(tokenAddress)
  const { theList } = useContext(Global)

  // TODO: MULTICALL

  const checkAllowance = useCallback(async () => {
    const allowance = await contract?.allowance(owner, spender)
    if (allowance)
      setState(
        allowance.gt(0) ? ApprovalState.APPROVED : ApprovalState.NOT_APPROVED
      )
  }, [contract, owner, spender])

  useEffect(() => {
    if (theList) {
      let tokenList: Token[] = []
      theList.tidePools.forEach((tp) => {
        const t0 = tp.pool.token0
        const t1 = tp.pool.token1
        tokenList.push(
          new Token(tp.chainId, t0.address, t0.decimals, t0.symbol, t0.name)
        )

        tokenList.push(
          new Token(tp.chainId, t1.address, t1.decimals, t1.symbol, t1.name)
        )
      })
      const addresses = Array.from(new Set(tokenList.map((t) => t.address)))
      setTokens(tokenList.filter((t) => addresses.includes(t.address)))
    }
  }, [theList])

  useEffect(() => {
    if (tokens && tokenAddress) {
      setToken(tokens.find((t) => t.address === tokenAddress))
    }
  }, [tokens, tokenAddress])

  useEffect(() => {
    if (owner) checkAllowance()
  }, [state, contract, checkAllowance, owner])

  useEffect(() => {
    const getBalance = async () => {
      setBalance(await contract?.balanceOf(owner))
    }
    if (owner) getBalance()
  }, [contract, owner])

  return useMemo(() => {
    const approve = async () => {
      await contract?.approve(spender, MAX_UINT256)
      await checkAllowance()
    }

    return {
      token,
      tokens,
      state,
      balance,
      approve,
    }
  }, [token, state, balance, checkAllowance, contract, spender, tokens])
}

export default useToken
