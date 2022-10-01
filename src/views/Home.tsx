import React from "react"
import {
  Flex,
  Box,
  Heading,
  Text,
  HollowButton,
  UnorderedList,
  BlobWrapper,
} from "../components"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import theme from "../info/theme"

const ContentBox = styled(Flex)`
  position: relative;
`

const Crab = styled.img`
  right: 1rem;
  max-height: 100px;
  transform: scaleX(-1);
  position: absolute;

  ${(props) => props.theme.mediaQueries.md} {
    max-height: 150px;
    right: -200px;
  }
`

const Coins = styled.img`
  right: 1rem;
  max-height: 50px;
  transform: scaleX(-1);
  position: absolute;
  top: 10%;

  ${(props) => props.theme.mediaQueries.md} {
    max-height: 75px;
    right: -200px;
  }
`

function Home() {
  const navigate = useNavigate()

  return (
    <Box mx="auto">
      <BlobWrapper height="100px">
        <ContentBox justifyContent="center" p="1rem">
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
                <HollowButton onClick={() => navigate("/pools")}>
                  View Pools
                </HollowButton>
              </Box>
            </Flex>
          </Flex>
          <Crab src="/images/TidePoolsCrab.svg" />
        </ContentBox>
      </BlobWrapper>
      <ContentBox justifyContent="center">
        <Flex flexDirection="column" p="1rem">
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
              <HollowButton onClick={() => navigate("/pools")}>
                View Pools
              </HollowButton>
            </Box>
          </Flex>
        </Flex>
        <Coins src="/images/pile-of-coins.gif" />
      </ContentBox>
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
