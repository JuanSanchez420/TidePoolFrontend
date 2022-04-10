import React, { useContext } from 'react';
import { Flex, Box } from '../components';
import { Card } from "../components/Card"
import { tidePools } from "../info/tidePools"
import { Global } from "../context/GlobalContext"



function Home() {
    const g = useContext(Global)

    return (
        <Box mx="auto">
            <Flex width="100%" flexWrap="wrap" flexDirection="row">
                {tidePools.map(tp=>tp.chain.chainId === g?.network.chainId ? <Card key={tp.address} tidePool={tp}/> : null)}
            </Flex>
        </Box>
    );
}

export default Home;
