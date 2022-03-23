import React, { useContext } from 'react';
import { Box } from '../components';
import { Card } from "../components/Card"
import { tidePools } from "../info/tidePools"
import { Global } from "../context/GlobalContext"



function Home() {
    const g = useContext(Global)

    return (
        <Box>
            {tidePools.map(tp=>tp.chain.chainId === g?.network.chainId ? <Card key={tp.address} tidePool={tp}/> : null)}
        </Box>
    );
}

export default Home;
