import { useState, useEffect, useCallback, useContext } from "react"
import { useTokenContract } from "./useContract"
import { MAX_UINT256 } from "../info/constants"
import { ApprovalState } from "../info/types"
import { Token } from "@uniswap/sdk-core"
import { Global } from "../context/GlobalContext"
import { usePublicClient } from "wagmi"

interface TokenUtils {
  token: Token | undefined
  tokens: Token[]
  state: ApprovalState
  balance: bigint
  getBalance: () => Promise<void>
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
  const [balance, setBalance] = useState<bigint>(0n)
  const contract = useTokenContract(tokenAddress)
  const { theList } = useContext(Global)
  const publicClient = usePublicClient()

  const checkAllowance = useCallback(async () => {
    if (!contract || !owner || !spender) return
    const allowance = (await contract.read.allowance([
      owner,
      spender,
    ])) as bigint
    if (allowance)
      setState(
        allowance > 0n ? ApprovalState.APPROVED : ApprovalState.NOT_APPROVED
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
    return () => setTokens([])
  }, [theList])

  useEffect(() => {
    if (tokens && tokenAddress) {
      setToken(tokens.find((t) => t.address === tokenAddress))
    }
  }, [tokens, tokenAddress])

  useEffect(() => {
    if (owner && contract) checkAllowance()
  }, [state, contract, checkAllowance, owner])

  const getBalance = useCallback(async () => {
    if (!contract || !owner) return
    const r = (await contract.read.balanceOf([owner])) as bigint
    setBalance(r)
  }, [contract, owner])

  useEffect(() => {
    const gBalance = async () => {
      const r = (await contract?.read.balanceOf([owner])) as bigint
      setBalance(r)
    }
    if (owner && contract) gBalance()
  }, [contract, owner])

  const approve = useCallback(async () => {
    if (!contract) return
    const hash = await contract.write.approve([spender, MAX_UINT256])
    await publicClient.waitForTransactionReceipt({ hash })
    await checkAllowance()
  }, [contract, checkAllowance, spender, publicClient])

  return {
    token,
    tokens,
    state,
    balance,
    getBalance,
    approve,
  }
}

export default useToken
