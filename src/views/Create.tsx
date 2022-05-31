import React, { useState } from "react"
import { Flex, Box, Text, Button } from '../components'
import { TextInput } from "../components/Input"
import useFactory from "../hooks/useFactory"

const CreateTidePool = () => {
    const [selected, setSelected] = useState("")
    const { deploy } = useFactory()

    const createPool = async () => {
        await deploy(selected)
    }

    return (
        <Box maxWidth="500px" mx="auto">
            <Text>Want to use TidePools for a UniswapV3 pool you don't see listed? Create one!</Text>
            <Text>Simply select the tokens of the pool, the Uniswap fee tier, and submit*.</Text>
            <Text>Your TidePool will be ready to use after your transaction completes.</Text>
            <Text fontSize="10">(*The transaction fee is the cost to deploy the contract, which will vary from chain to chain.)</Text>
            <Flex flexDirection="column">
                <TextInput value={selected} setValue={setSelected} placeholder="UniswapV3 Pool address"/>
                <Button disabled={selected===""} onClick={()=>createPool()}>Create Pool</Button>
            </Flex>
        </Box>
    )
}

export default CreateTidePool