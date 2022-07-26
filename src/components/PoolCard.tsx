import React from "react"
import { useTokenContract, useUniswapPoolContract } from "../hooks/useContract"
import { Box, Text } from "../components"

const PoolCard = (address?: string) => {
  const pool = useUniswapPoolContract(address)
  const token0 = useTokenContract(pool?.token0.address)
  const token1 = useTokenContract(pool?.token1.address)

  return (
    <Box>
      <Text>Pool: {pool?.address}</Text>
      <Text>Token0: {token0?.symbol}</Text>
      <Text>Token1: {token1?.symbol}</Text>
    </Box>
  )
}

export default PoolCard
