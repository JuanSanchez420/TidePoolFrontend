import React, { useState } from "react"
import { Flex, Box, Text, Select } from '../components'
import { useFactoryContract } from "../hooks/useContract"

// get list of Uniswap pools. Where? Subgraph, moralis, cached
// get list of tidePools
// set tickWindow? No, give a value based on recent volatility
// token token fee

const CreateTidePool = () => {
    const [selected, setSelected] = useState("")
    const pools = [{address: 0x0, token0: 0x0, token1: 0x0, fee: 500}]

    return (
        <Box>
            <Text>Want to use TidePools for a UniswapV3 pool you don't see listed? Create one!</Text>
            <Text>Simply select the tokens of the pool, the Uniswap fee tier, and submit*.</Text>
            <Text>Your TidePool will be ready to use after your transaction completes.</Text>
            <Text fontSize="10">(*The transaction fee is the cost to deploy the contract, which will vary from chain to chain.)</Text>
            <Flex>
                <Select value={selected} onChange={(e)=>setSelected(e.target.value)}>
                    <option/>
                    {pools.map(p=><option value={p.address}>{p.address}</option>)}
                </Select>
            </Flex>
        </Box>
    )
}

export default CreateTidePool