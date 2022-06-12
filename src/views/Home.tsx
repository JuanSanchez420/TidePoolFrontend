import React, { useContext, useState, useMemo } from 'react';
import { Flex, Box } from '../components';
import { Search } from "../components/Icons"
import { TextInput } from "../components/Input";
import { Card } from "../components/Card"
import { Global } from "../context/GlobalContext"
import Welcome from '../components/Welcome';

function Home() {
    const g = useContext(Global)
    const [search, setSearch] = useState("")

    const view = useMemo(()=>{
        if(search === "")
            return g.theList.tidePools

        return  g.theList.tidePools.filter(tp=>
            tp.pool.token0.symbol.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
            tp.pool.token1.symbol.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
            tp.pool.token0.address === search ||
            tp.pool.token1.address === search ||
            tp.address === search
        ) || []
    },[search, g.theList.tidePools])

    return (
        <Box mx="auto">
            <Flex justifyContent="center" alignItems="center" mb="1rem">
                <Welcome/>
            </Flex>
            <Flex justifyContent="center" alignItems="center">
                <TextInput value={search} setValue={setSearch} placeholder="Search" icon={<Search height="2rem" width="2rem"/>}/>
            </Flex>
            <Flex width="100%" flexWrap="wrap" flexDirection="row">
                {view.map((tp,i)=><Card key={`${tp.address}-${i}`} tidePool={tp}/>)}
            </Flex>
        </Box>
    );
}

export default Home;
