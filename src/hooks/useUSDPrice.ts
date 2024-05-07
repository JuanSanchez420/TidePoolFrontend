import useSubgraph from "./useSubgraph"
import { useCallback, useEffect, useState } from "react"
import { formatEther } from "viem"

const useUSDPrice = (address?: string) => {
  const { getDerivedETHValue, getETHUSD } = useSubgraph()
  const [price, setPrice] = useState(0)

  const getUSDPrice = useCallback(async () => {
    if (!address) return 0
    const ethPrice = BigInt(await getETHUSD())
    const tokenPrice = await getDerivedETHValue(address)
    return parseFloat(formatEther(ethPrice * tokenPrice))
  }, [address, getDerivedETHValue, getETHUSD])

  useEffect(() => {
    if (!address) return
    getUSDPrice().then(setPrice)
  }, [address, getUSDPrice])

  return price
}

export default useUSDPrice
