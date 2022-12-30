import { useContext, useEffect, useRef, useState } from "react"
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
import { ethers } from "ethers"
import {
  FeeAmount,
  maxLiquidityForAmounts,
  TickMath,
  tickToPrice,
} from "@uniswap/v3-sdk"
import usePool from "../hooks/usePool"
import JSBI from "jsbi"
import { Fraction } from "@uniswap/sdk-core"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { External } from "../components/Icons"
import { Global } from "../context/GlobalContext"
import { networks } from "../info/networks"
import useNetwork from "../hooks/useNetwork"

interface Results {
  fee: number
  volume: number
  share: Fraction
  lower: number
  upper: number
  fees24h: number
  fees30d: number
  fees365d: number
}

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
  const params = useParams()
  const poolAddress = params.address || ""
  const navigate = useNavigate()
  const { theList } = useContext(Global)
  const tidePool = theList.tidePools.find(
    (tp) => tp.pool.address.toLowerCase() === poolAddress.toLowerCase()
  )
  const network = useNetwork()
  const loaded = useRef(false)
  const { getETHUSD, getDerivedETHValue } = useSubgraph()
  const { pool, estimateRange } = usePool(poolAddress)
  const { getVolume, getLiquidity } = useSubgraph()
  const [results, setResults] = useState<Results>({
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
    const f = async () => {
      loaded.current = true
      if (pool) {
        const ETHUSD = await getETHUSD()

        const token0ETHValue = network.WETH.equals(pool.token0)
          ? ethers.utils.parseEther("1")
          : await getDerivedETHValue(pool.token0.address)
        const token1ETHValue = network.WETH.equals(pool.token1)
          ? ethers.utils.parseEther("1")
          : await getDerivedETHValue(pool.token1.address)
        const amountInETH = ethers.utils.parseEther(
          String(depositAmount / ETHUSD)
        )

        const wei0 = network.WETH.equals(pool.token0)
          ? amountInETH
          : ethers.utils.parseUnits(
              amountInETH.div(token0ETHValue).toString(),
              pool.token0.decimals
            )
        const wei1 = network.WETH.equals(pool.token1)
          ? amountInETH
          : ethers.utils.parseUnits(
              amountInETH.div(token1ETHValue).toString(),
              pool.token1.decimals
            )

        const [lower, upper] = estimateRange()

        const positionLiquidity = maxLiquidityForAmounts(
          pool?.sqrtRatioX96,
          TickMath.getSqrtRatioAtTick(lower),
          TickMath.getSqrtRatioAtTick(upper),
          wei0.toString(),
          wei1.toString(),
          true
        )

        const volume = await getVolume(poolAddress.toLowerCase())

        const totalLiquidity = await getLiquidity(
          poolAddress.toLowerCase(),
          TickMath.MIN_TICK,
          pool?.tickCurrent
        )

        const share = new Fraction(
          positionLiquidity.toString(),
          JSBI.add(
            positionLiquidity,
            JSBI.BigInt(totalLiquidity.toString())
          ).toString()
        )

        const fee = pool.fee ? pool.fee / 1000000 : FeeAmount.LOWEST / 1000000
        const result = volume * fee * parseFloat(share.toFixed(10))

        setResults({
          fee,
          volume,
          share,
          lower,
          upper,
          fees24h: result,
          fees30d: result * 30,
          fees365d: result * 365,
        })
      }
    }
    if (!loaded.current && pool) f()
  }, [
    getETHUSD,
    getDerivedETHValue,
    pool,
    estimateRange,
    network,
    getLiquidity,
    getVolume,
    poolAddress,
  ])

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
            <Text color={theme.colors.white}>
              Range:{" "}
              {pool
                ? tickToPrice(pool.token0, pool.token1, results.lower).toFixed()
                : 0}{" "}
              to{" "}
              {pool
                ? tickToPrice(pool.token0, pool.token1, results.upper).toFixed()
                : 0}
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
                    navigate(`/${network.name}/${tidePool?.address}`)
                  }
                >
                  Enter TidePool
                </Button>
              </Flex>
            ) : null}
          </Flex>
        )}
      </Container>
      <Text mt="1rem" color={theme.colors.white}>
        The above calculations are ESTIMATES ONLY and don't take into account
        impermanent loss or slippage.
      </Text>
    </Box>
  )
}

export default Calculator
