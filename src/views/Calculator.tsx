import { useContext, useEffect, useMemo, useRef, useState } from "react"
import {
  Flex,
  Box,
  Heading,
  Text,
  LoadingLogo,
  Button,
  Dots,
} from "../components"
import theme from "../info/theme"
import useSubgraph from "../hooks/useSubgraph"
import { tickToPrice } from "@uniswap/v3-sdk"
import usePool, { EstimatedPosition } from "../hooks/usePool"
import { Fraction } from "@uniswap/sdk-core"
import styled from "styled-components"
import { External } from "../components/Icons"
import { Global } from "../context/GlobalContext"
import { getNetworkByName } from "../info/networks"
import { useRouter } from "next/router"
import { parseEther } from "viem"
import Link from "next/link"

export const Container = styled(Box)`
  border-radius: 1rem;
  padding: 10px;
  max-width: 600px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  filter: ${({ theme }) => theme.utils.dropShadow};
  margin: auto;
`

const ContractLink = styled.a`
  color: ${({ theme }) => theme.colors.babyBlue};
  font-size: 0.85rem;
`

const FlipClick = styled.a`
  color: ${({ theme }) => theme.colors.babyBlue};
  font-size: 0.85rem;
  cursor: pointer;
`

const ExternalLink = styled(Link)`
  padding: 0.1rem;
  color: white;
`

const BackLink = styled(Link)`
  color: white;
  text-align: center;
  :hover {
    text-decoration: underline;
  }
`

const Loading = () => {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <LoadingLogo />
      <Text color="white" mt="1rem">
        <Dots>Loading</Dots>
      </Text>
    </Flex>
  )
}

const Calculator = () => {
  const router = useRouter()
  const poolAddress = (router.query.address || "").toString()
  const { theList, setDefaultNetwork } = useContext(Global)
  const tidePool = theList.tidePools.find(
    (tp) => tp.poolAddress.toLowerCase() === poolAddress.toLowerCase()
  )
  const networkParam = getNetworkByName(
    router.query.network?.toString() || "Ethereum"
  )
  const { network } = useContext(Global)
  const loaded = useRef(false)
  const { getETHUSD, getDerivedETHValue, getVolume } = useSubgraph()
  const { pool, getEstimatedPosition } = usePool(poolAddress)
  const [zeroFirst, setZeroFirst] = useState<boolean>(false)
  const [results, setResults] = useState<EstimatedPosition>({
    wei0: 0n,
    wei1: 0n,
    depositAmount: 1000,
    fee: 0,
    volume: 0,
    share: new Fraction(0),
    lower: 0,
    upper: 0,
    fees24h: 0,
    fees30d: 0,
    fees365d: 0,
  })

  const depositAmount = 1000

  useEffect(() => {
    if (networkParam) setDefaultNetwork(networkParam.chainId)
  }, [networkParam, setDefaultNetwork])

  useEffect(() => {
    const f = async () => {
      loaded.current = true
      if (pool) {
        const ETHUSD = await getETHUSD()

        const token0ETHValue = network.WETH.equals(pool.token0)
          ? parseEther("1")
          : await getDerivedETHValue(pool.token0.address)
        const token1ETHValue = network.WETH.equals(pool.token1)
          ? parseEther("1")
          : await getDerivedETHValue(pool.token1.address)

        const volume = await getVolume(poolAddress)

        const results = getEstimatedPosition(
          ETHUSD,
          token0ETHValue,
          token1ETHValue,
          volume
        )

        if (results) setResults(results)
      }
    }
    if (!loaded.current && pool) f()
  }, [
    getETHUSD,
    getDerivedETHValue,
    getEstimatedPosition,
    pool,
    network,
    getVolume,
    poolAddress,
  ])

  const [upper, lower] = useMemo(() => {
    if (results.fee && pool) {
      const tokens = zeroFirst
        ? [pool.token0, pool.token1]
        : [pool.token1, pool.token0]
      const t0 = tickToPrice(tokens[0], tokens[1], results.lower).toFixed()
      const t1 = tickToPrice(tokens[0], tokens[1], results.upper).toFixed()
      return [t0, t1]
    }
    return ["0", "0"]
  }, [results, pool, zeroFirst])

  return (
    <Box p="1rem" maxWidth="1000px">
      <Heading>Uniswap V3 Calculator</Heading>
      <Text mb="1rem" color={theme.colors.white}>
        Let's calculate fees from being in Uniswap's V3 liquidity pools.
      </Text>
      <Container>
        {results.fee === 0 ? (
          <Loading />
        ) : (
          <Flex mb="1rem" maxWidth="400px" mx="auto" flexDirection="column">
            <Text color={theme.colors.white}>
              {pool
                ? `${pool.token0.symbol}/${pool.token1.symbol} on ${network.name}`
                : ""}
            </Text>
            <ContractLink
              href={`${network.blockExplorer}address/${poolAddress}`}
              target="_blank"
            >
              {poolAddress} <External height="1rem" width="1rem" />
            </ContractLink>

            <Text color={theme.colors.white}>
              Deposit amount: ${depositAmount.toLocaleString()}
            </Text>
            <Text color={theme.colors.white}>
              Pool fee: {results.fee * 100}%
            </Text>
            <Text color={theme.colors.white}>
              Pool volume last 24h:{" "}
              {results.volume.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Text>
            <Text color={theme.colors.white} mr="1rem">
              Range (
              <FlipClick onClick={() => setZeroFirst(!zeroFirst)}>
                Flip
              </FlipClick>
              ): {lower} to {upper}
            </Text>
            <Text color={theme.colors.white}>
              Share of liquidity: {results.share.multiply(100).toFixed(6)}%
            </Text>
            <Text color={theme.colors.white}>
              All fees last 24h:{" "}
              {(results.fee * results.volume).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Text>
            <Text color={theme.colors.white}>
              Fees gained last 24h:{" "}
              {`${results.fees24h.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}`}
            </Text>
            <Text color={theme.colors.white}>
              Fees gained over 30d:{" "}
              {`${results.fees30d.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}`}
            </Text>
            <Text color={theme.colors.white}>
              Fees gained over 365d:{" "}
              {`${results.fees365d.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}`}
            </Text>
            <Text color={theme.colors.white}>
              Daily APR: {((results.fees24h / depositAmount) * 100).toFixed(2)}%
            </Text>
            <Text color={theme.colors.white}>
              Monthly APR:{" "}
              {((results.fees30d / depositAmount) * 100).toFixed(2)}%
            </Text>
            <Text color={theme.colors.white}>
              Yearly APR:{" "}
              {((results.fees365d / depositAmount) * 100).toFixed(2)}%
            </Text>
            {tidePool ? (
              <Flex justifyContent="center" mt="1rem">
                <Button
                  onClick={() =>
                    router.push(`/${network.name}/${tidePool?.address}`)
                  }
                >
                  Enter TidePool
                </Button>
              </Flex>
            ) : null}
          </Flex>
        )}
      </Container>
      <Flex flexDirection="column" justifyContent="center" my="1rem">
        <BackLink href="/pools">Back to all pools</BackLink>
        <Text mt="1rem" color={theme.colors.white}>
          The above calculations are ESTIMATES ONLY and don't take into account
          impermanent loss or slippage.
        </Text>
        <Text color="white" mt="1rem">
          For a more detailed explanation, visit{" "}
          <ExternalLink href="/how-it-works" target="_blank">
            How It Works
          </ExternalLink>
          ,{" "}
          <ExternalLink href="/what-is-impermanent-loss" target="_blank">
            Impermanent Loss
          </ExternalLink>
          , or{" "}
          <ExternalLink
            href="/how-to-provide-liquidity-profitably"
            target="_blank"
          >
            How to Provide Liquidity Profitably
          </ExternalLink>
          .
        </Text>
      </Flex>
    </Box>
  )
}

export default Calculator
