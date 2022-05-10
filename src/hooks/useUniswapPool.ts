import { useState, useMemo, useCallback, useEffect } from "react"
import ethers from "ethers"

const useUniswapPools = (token0: string, token1: string, fee: number) => {
    const [pools, setPools] = useState([])

    useEffect(()=>{
        const f = async () => {
            // setPools(await )
        }
        f();
    },[token0, token1, fee])

    return useMemo(()=>{

    },[pools])
}

export default useUniswapPools