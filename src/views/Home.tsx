import {
  Flex,
  Box,
  Heading,
  Text,
  HollowButton,
  UnorderedList,
} from "../components"
import styled from "styled-components"
import theme from "../info/theme"
import WaveWrapper from "../components/Waves"
import { useRouter } from "next/router"

const CrabHeading = styled.img`
  height: 100%;
  max-height: 75px;
  transform: scaleX(-1);

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

const CrabHero = styled.img`
  display: none;
  height: 100%;
  max-height: 75px;
  transform: scaleX(-1);
  z-index: 2;

  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
    max-height: 150px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    max-height: 200px;
  }
`

const CoinsHeading = styled.img`
  max-height: 50px;
  transform: scaleX(-1);

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

const CoinsHero = styled.img`
  display: none;
  max-height: 50px;
  transform: scaleX(-1);

  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
    max-height: 75px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    max-height: 100px;
  }
`

const ZFlex = styled(Flex)`
  z-index: 11;
`

function Home() {
  const router = useRouter()

  return (
    <Box mx="auto" width="100%">
      <WaveWrapper>
        <Flex
          justifyContent="center"
          p="1rem"
          alignItems={["start", "start", "center"]}
        >
          <ZFlex flexDirection="column">
            <Flex>
              <Heading mb="1rem" mr="1rem">
                Welcome to TIDEPOOLS.io
              </Heading>
              <CrabHeading src="/images/TidePoolsCrab.svg" />
            </Flex>
            <Text mb="1rem" color={theme.colors.white}>
              We generate the largest returns on Uniswap V3 liquidity pools.
            </Text>
            <Text mb="1rem" color={theme.colors.white}>
              Connect your wallet, deposit in a pool, and we take care of the
              rest.
            </Text>
            <Flex justifyContent="center">
              <Box width={"8rem"}>
                <HollowButton onClick={() => router.push("/pools")}>
                  View Pools
                </HollowButton>
              </Box>
            </Flex>
          </ZFlex>
          <CrabHero src="/images/TidePoolsCrab.svg" />
        </Flex>
      </WaveWrapper>

      <Flex
        justifyContent="center"
        p="1rem"
        alignItems={["start", "start", "center"]}
      >
        <Flex flexDirection="column">
          <Flex>
            <Heading mb="1rem" mr="1rem">
              Generate Passive Income
            </Heading>
            <CoinsHeading src="/images/pile-of-coins.gif" />
          </Flex>
          <Text color={theme.colors.white}>
            TIDEPOOLS.io turns V3 liquidity pools into hassle-free V2 liquidity
            pools.
          </Text>

          <UnorderedList>
            <li>Automated pool management</li>
            <li>Maximize fee generation</li>
            <li>We pay all the gas costs</li>
          </UnorderedList>
        </Flex>
        <CoinsHero src="/images/pile-of-coins.gif" />
      </Flex>
      <WaveWrapper>
        <Flex
          justifyContent="center"
          p="1rem"
          alignItems={["start", "start", "center"]}
        >
          <Flex flexDirection="column">
            <Flex>
              <Heading mb="1rem">
                Find the pool that's right for you
              </Heading>
            </Flex>
            <Text color={theme.colors.white}>
              TidePools are across 4 chains (Ethereum, Arbitrum, Optimism, and
              Polygon) with many pools per chain. <br />
              And if you don't see a pool you want, you can create it in a
              simple transaction!
            </Text>

            <UnorderedList>
              <li>Multiple chains</li>
              <li>APR calculators to find the highest returns</li>
              <li>Create your own TidePools</li>
            </UnorderedList>
          </Flex>
        </Flex>
      </WaveWrapper>
    </Box>
  )
}

export default Home
