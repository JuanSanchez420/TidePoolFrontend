import React from "react"
import {
  Flex,
  Box,
  Heading,
  Text,
  HollowButton,
  UnorderedList,
} from "../components"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import theme from "../info/theme"

const HeroBox = styled(Flex)`
  position: relative;
`

const Crab = styled.img`
  right: 0;
  max-height: 100px;
  transform: scaleX(-1);
  position: absolute;

  ${(props) => props.theme.mediaQueries.md} {
    max-height: 150px;
  }
`

function Home() {
  
  const navigate = useNavigate()

  return (
    <Box mx="auto" p="1rem">
      <HeroBox justifyContent="center" mb="2rem">
        <Flex flexDirection="column">
          <Box maxWidth={["12rem", "12rem", "30rem"]}>
            <Heading mb="1rem">Welcome to TIDEPOOLS.io</Heading>
          </Box>
          <Text mb="1rem" color={theme.colors.white}>
            We generate the largest returns on Uniswap V3 liquidity pools.
          </Text>
          <Text mb="1rem" color={theme.colors.white}>
            Connect your wallet, deposit in a pool, and we take care of the
            rest.
          </Text>
          <Flex justifyContent="center">
            <Box width={"8rem"}>
              <HollowButton onClick={()=>navigate("/list")}>View Pools</HollowButton>
            </Box>
          </Flex>
        </Flex>
        <Crab src="/images/TidePoolsCrab.svg" />
      </HeroBox>
      <Flex justifyContent="center">
        <Flex flexDirection="column">
          <Box maxWidth={["20rem", "20rem", "30rem"]}>
            <Heading mb="1rem">Generate Passive Income</Heading>
          </Box>
          <Text color={theme.colors.white}>
            TIDEPOOLS.io turns V3 liquidity pools into hassle-free V2 liquidity
            pools.
          </Text>

          <UnorderedList>
            <li>Automated pool management.</li>
            <li>Maximize fee generation</li>
            <li>Pays all the gas costs</li>
          </UnorderedList>

          <Flex justifyContent="center">
            <Box width={"8rem"}>
              <HollowButton onClick={()=>navigate("/list")}>View Pools</HollowButton>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        mt="1rem"
      >
        <Text
          color={theme.colors.yellow}
          fontWeight="900"
          mb="1rem"
          fontSize="1.5rem"
        >
          BETA PRODUCT
        </Text>
        <Text color={theme.colors.yellow}>
          TIDEPOOLS.io contracts have been
        </Text>
        <Text color={theme.colors.yellow}>
          finalized, tested, and security checked.
        </Text>
        <Text color={theme.colors.yellow} mb="1rem">
          Our website is still a work in progress.
        </Text>
      </Flex>
    </Box>
  )
}

export default Home
