import React, { useContext, useState, useMemo } from 'react';
import { Flex, Box } from '../components';
import { Search } from "../components/Icons"
import { TextInput } from "../components/Input";
import { Card } from "../components/Card"
import { tidePools } from "../info/tidePools"
import { Global } from "../context/GlobalContext"



function Home() {
    const g = useContext(Global)
    const [search, setSearch] = useState("")

    const view = useMemo(()=>{
        if(search === "")
            return tidePools

        return  tidePools.filter(tp=>
            tp.pool.token0.symbol.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
            tp.pool.token1.symbol.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
            tp.pool.token0.address === search ||
            tp.pool.token1.address === search ||
            tp.address === search
        ) || []
    },[search])

    return (
        <Box mx="auto">
            <Flex justifyContent="center" alignItems="center">
                <TextInput value={search} setValue={setSearch} placeholder="Search" icon={<Search height="2rem" width="2rem"/>}/>
            </Flex>
            <Flex width="100%" flexWrap="wrap" flexDirection="row">
                {view.map((tp,i)=>tp.chain.chainId === g?.network.chainId ? <Card key={`${tp.address}-${i}`} tidePool={tp}/> : null)}
            </Flex>
        </Box>
    );
}

export default Home;
