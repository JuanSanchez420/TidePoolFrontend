import React, { useContext, useState, useMemo } from "react";
import { Flex, Box, BlobWrapper, Heading, Text } from "../components";
import { Search } from "../components/Icons";
import { TextInput } from "../components/Input";
import { Card } from "../components/Card";
import { Global } from "../context/GlobalContext";
import Welcome from "../components/Welcome";
import styled from "styled-components";

const HeroBox = styled(Flex)``;

const Crab = styled.img`
  max-height: 150px;
  transform: scaleX(-1);

  ${(props) => props.theme.mediaQueries.sm} {
    max-height: 300px;
  }
`;

function Home() {
  const g = useContext(Global);
  const [search, setSearch] = useState("");

  const view = useMemo(() => {
    if (search === "") return g.theList.tidePools;

    return (
      g.theList.tidePools.filter(
        (tp) =>
          tp.pool.token0.symbol.toLowerCase().indexOf(search.toLowerCase()) >=
            0 ||
          tp.pool.token1.symbol.toLowerCase().indexOf(search.toLowerCase()) >=
            0 ||
          tp.pool.token0.address === search ||
          tp.pool.token1.address === search ||
          tp.address === search
      ) || []
    );
  }, [search, g.theList.tidePools]);

  return (
    <Box mx="auto" p="1rem">
      <HeroBox width="100%">
        <Flex flex="1" flexDirection="column">
          <Heading mb="1rem">Welcome to TIDEPOOLS.io</Heading>
          <Text mb="1rem">
            We generate the largest returns on Uniswap V3 liquidity pools.
          </Text>
          <Text>
            Connect your wallet, deposit in a pool, and we take care of the
            rest.
          </Text>
        </Flex>
        <Crab src="/images/TidePoolsCrab.svg" />
      </HeroBox>
      <Flex justifyContent="center" alignItems="center" mb="1rem">
        <Welcome />
      </Flex>
      <Flex flexDirection="column">
        <Heading mb="1rem">Generate Passive Income</Heading>
        <Text>
          TIDEPOOLS.io turns V3 liquidity pools into hassle-free V2 liquidity
          pools.
        </Text>
        <ul style={{ color: "white" }}>
          <li>Automated pool management.</li>
          <li>Maximize fee generation</li>
          <li>Pays all the gas costs</li>
        </ul>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <TextInput
          value={search}
          setValue={setSearch}
          placeholder="Search"
          icon={<Search height="2rem" width="2rem" />}
        />
      </Flex>
      <Flex width="100%" flexWrap="wrap" flexDirection="row">
        {view.map((tp, i) => (
          <Card key={`${tp.address}-${i}`} tidePool={tp} slot0={null} />
        ))}
      </Flex>
    </Box>
  );
}

export default Home;
