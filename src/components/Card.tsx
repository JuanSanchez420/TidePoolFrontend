import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Box, Flex, Text, Button } from "./index"
import { Chevron, External } from "./Icons"
import styled from "styled-components"
import { imageUrls } from "../info/tokens"
import { TidePool } from "../info/types"
import theme from "../info/theme"
import Link from "next/link"
import { Position, tickToPrice } from "@uniswap/v3-sdk"
import getUniswapInfoLink from "../utils/getUniswapInfoLink"
import { Global } from "../context/GlobalContext"
import formatNumber from "../utils/formatNumber"
import { CurrencyAmount, Token } from "@uniswap/sdk-core"
import { useRouter } from "next/router"
import { useIsMounted } from "../hooks/useIsMounted"
import useUSDPrice from "../hooks/useUSDPrice"
import useSubgraph from "../hooks/useSubgraph"
import { formatEther, formatUnits, parseUnits } from "viem"
import { EstimatedPosition } from "../hooks/usePool"

const Fee = styled(Box)`
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.red};
  padding: 3px 13px;
  color: white;
  font-weight: 700;
  font-size: 0.75rem;
`

export const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.babyBlue};
  font-weight: 700;
  font-size: 1.25rem;
`

const IconBox = styled(Box)`
  position: relative;
`

const IconLeft = styled.img`
  height: 25px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

const IconRight = styled.img`
  height: 25px;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
`

export const Container = styled(Box)`
  border-radius: 1rem;
  padding: 10px;
  max-width: 400px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  filter: ${({ theme }) => theme.utils.dropShadow};
`

const DetailsLink = styled.a`
  color: ${({ theme }) => theme.colors.yellow};
  font-weight: 700;
  :hover {
    cursor: pointer;
  }
`

const ContractLink = styled.a`
  color: ${({ theme }) => theme.colors.babyBlue};
  font-size: 1rem;
`

const APRLink = styled(Link)`
  color: white;
`

const T = styled(Text)`
  font-size: 1rem;
  color: white;
`

const Header = styled(Text)`
  font-size: 1.25rem;
  color: white;
  color: ${({ theme }) => theme.colors.babyBlue};
  font-weight: 700;
`

const StyledButton = styled(Button)`
  width: 100px;
`

export const Info = (props: {
  tidePool?: TidePool
  balance: bigint | undefined
  position: Position | undefined
  estimatedPosition: EstimatedPosition | undefined
  lastRebalance: bigint | undefined
  totalSupply: bigint | undefined
  pendingRewards?: {
    rewards0: CurrencyAmount<Token>
    rewards1: CurrencyAmount<Token>
  }
  hideEntryLink?: boolean
}) => {
  const isMounted = useIsMounted()
  const { network } = useContext(Global)
  const [open, setOpen] = useState(props.hideEntryLink || false)
  const router = useRouter()

  const {
    tidePool,
    balance,
    position,
    hideEntryLink,
    totalSupply,
    lastRebalance,
    pendingRewards,
    estimatedPosition,
  } = props

  const [mostRecentTx, setMostRecentTx] = useState<number | null>(null)
  const { getMostRecentTx } = useSubgraph()
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current || !tidePool || !position) return
    const getTx = async () => {
      loaded.current = true
      const tx = await getMostRecentTx(tidePool.address)
      setMostRecentTx(tx)
    }
    getTx()
  }, [tidePool, mostRecentTx, getMostRecentTx, position])

  const balanceFormatted = useMemo(() => {
    if (!balance) return "0"

    return parseFloat(formatEther(balance)).toLocaleString()
  }, [balance])

  const fee = tidePool ? tidePool?.pool.fee / 1e4 : 0

  const [amount0, amount1, upper, lower] = useMemo(() => {
    if (!position) return ["0", "0", "0", "0"]
    const zero = formatUnits(
      BigInt(position.amount0.quotient.toString()),
      position.pool.token0.decimals
    )
    const one = formatUnits(
      BigInt(position.amount1.quotient.toString()),
      position.pool.token1.decimals
    )
    const upper = position.token0PriceUpper.toFixed(8)
    const lower = position.token0PriceLower.toFixed(8)
    return [
      formatNumber(zero),
      formatNumber(one),
      formatNumber(upper),
      formatNumber(lower),
    ]
  }, [position])

  // if no position, don't fetch price data
  const price0 = useUSDPrice(
    position ? tidePool?.pool.token0.address : undefined
  )
  const price1 = useUSDPrice(
    position ? tidePool?.pool.token1.address : undefined
  )

  const formattedLastRebalance = useMemo(() => {
    if (!lastRebalance) return "N/A"
    const date = new Date(Number(lastRebalance) * 1000)
    return date.toLocaleString()
  }, [lastRebalance])

  const formattedPendingRewards = useMemo(() => {
    if (!pendingRewards) return "-"
    const { rewards0, rewards1 } = pendingRewards

    const zero = BigInt(rewards0.quotient.toString())
    const one = BigInt(rewards1.quotient.toString())
    const rewards = [
      `${rewards0.currency.symbol} ${formatNumber(
        formatUnits(zero, rewards0.currency.decimals)
      )}`,
      `${rewards1.currency.symbol} ${formatNumber(
        formatUnits(one, rewards1.currency.decimals)
      )}`,
    ]
    return rewards
  }, [pendingRewards])

  const actualAPR = useMemo(() => {
    if (!pendingRewards || !mostRecentTx || !position || !price0 || !price1)
      return "="

    const { rewards0, rewards1 } = pendingRewards

    const lastTx = mostRecentTx || Date.now() / 1000
    const timeSinceLastTx = (Date.now() / 1000 - lastTx) / 86400
    const zeroRewards = BigInt(rewards0.quotient.toString())
    const rewards0PerDay =
      parseFloat(formatUnits(zeroRewards, rewards0.currency.decimals)) /
      timeSinceLastTx
    const oneRewards = BigInt(rewards1.quotient.toString())
    const rewards1PerDay =
      parseFloat(formatUnits(oneRewards, rewards1.currency.decimals)) /
      timeSinceLastTx

    const zero = formatUnits(
      BigInt(position.amount0.quotient.toString()),
      position.pool.token0.decimals
    )
    const one = formatUnits(
      BigInt(position.amount1.quotient.toString()),
      position.pool.token1.decimals
    )

    const amount0USD = parseFloat(zero) * price0
    const amount1USD = parseFloat(one) * price1
    const totalUSD = amount0USD + amount1USD

    const totalRewards =
      rewards0PerDay * 365 * price0 + rewards1PerDay * 365 * price1

    const apr = (totalRewards / totalUSD) * 100

    return apr.toFixed(2)
  }, [pendingRewards, price0, price1, mostRecentTx, position])

  const positionValueUSD = useMemo(() => {
    if (!position || !price0 || !price1) return "-"
    const zero = formatUnits(
      BigInt(position.amount0.quotient.toString()),
      position.pool.token0.decimals
    )
    const one = formatUnits(
      BigInt(position.amount1.quotient.toString()),
      position.pool.token1.decimals
    )

    const amount0USD = parseFloat(zero) * price0
    const amount1USD = parseFloat(one) * price1
    const totalUSD = amount0USD + amount1USD

    return formatNumber(totalUSD)
  }, [price0, price1, position])

  const percentOfPool = useMemo(() => {
    if (!totalSupply || !balance) return "0"
    const percent = totalSupply > 0n ? (balance * 100n) / totalSupply : 0n
    return parseFloat(percent.toString()).toLocaleString()
  }, [balance, totalSupply])

  const { image0, image1 } = useMemo(() => {
    if (!tidePool) return { image0: "", image1: "" }
    return {
      image0:
        imageUrls[tidePool.pool.token0.symbol || ""] ??
        imageUrls[`empty${network.name}`],
      image1:
        imageUrls[tidePool.pool.token1.symbol || ""] ??
        imageUrls[`empty${network.name}`],
    }
  }, [tidePool, network])

  const { t0, t1 } = useMemo(() => {
    if (!tidePool) return { t0: undefined, t1: undefined }
    return {
      t0: new Token(
        tidePool.chainId,
        tidePool.pool.token0.address,
        tidePool.pool.token0.decimals,
        tidePool.pool.token0.symbol,
        tidePool.pool.token0.name
      ),
      t1: new Token(
        tidePool.chainId,
        tidePool.pool.token1.address,
        tidePool.pool.token1.decimals,
        tidePool.pool.token1.symbol,
        tidePool.pool.token1.name
      ),
    }
  }, [tidePool])

  if (!isMounted) return null

  return (
    <Box>
      <Flex pb="10px" alignItems="center" justifyContent="space-around">
        <Flex alignItems="center">
          <IconBox width="40px" height="35px" marginRight="1rem">
            <IconLeft src={image0} />
            <IconRight src={image1} />
          </IconBox>
          <Title>
            {tidePool?.pool.token0?.symbol} - {tidePool?.pool.token1?.symbol}
          </Title>
        </Flex>
        <Fee>{fee}% Fee</Fee>
      </Flex>
      <Flex
        pb="10px"
        alignItems="center"
        justifyContent="space-evenly"
        px="15px"
      >
        <Flex flexDirection="column" flex="1">
          {balance && balance > 0n ? (
            <Text color="white" fontSize="0.75rem">
              {`Balance: ${balanceFormatted} TPOOL`}
              <br />
              {`${percentOfPool}% of this TidePool`}
            </Text>
          ) : (
            <Text color="white" fontSize="0.75rem">
              &nbsp;
            </Text>
          )}
        </Flex>
        <Flex flex="2">
          <Text color="white" fontSize="1rem">
            <APRLink
              href={`/uniswap-v3-calculator/${network.name}/${tidePool?.poolAddress}`}
            >
              {tidePool?.APR
                ? `${formatNumber(tidePool?.APR)}% APR`
                : "Calculate APR"}
            </APRLink>
          </Text>
        </Flex>
        <DetailsLink onClick={() => setOpen(!open)}>
          <Flex flex="1">
            <Text>Details</Text>
            <Text width="12px" ml="5px">
              <Chevron open={open} />
            </Text>
          </Flex>
        </DetailsLink>
      </Flex>
      {open && (
        <Box px="1rem">
          {position && totalSupply !== undefined && totalSupply > 0n && (
            <Flex
              borderTop={`2px solid ${theme.colors.lightBlue}`}
              py="0.5rem"
              flexDirection="column"
            >
              <Flex flexDirection="column" mb="0.5rem">
                <Header>Current TidePool Position</Header>
                <Text
                  color="white"
                  fontSize="0.85rem"
                >{`Last rebalanced on: ${formattedLastRebalance}`}</Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Flex flexDirection="column">
                  <T>{`Total ${position.pool.token0.symbol}: ${amount0}`}</T>
                  <T>{`Total ${position.pool.token1.symbol}: ${amount1}`}</T>
                  <T>{`Position value: $${positionValueUSD.toLocaleString()}`}</T>
                </Flex>
                <Flex flexDirection="column">
                  <T>Upper limit: {upper}</T>
                  <T>Lower limit: {lower}</T>
                  <T>{`Live APR: ${actualAPR}%`}</T>
                </Flex>
              </Flex>
              <Flex justifyContent="center" mt="1rem">
                <T fontStyle="italic">{`Pending rewards: ${formattedPendingRewards[0]}, ${formattedPendingRewards[1]}`}</T>
              </Flex>
              {balance !== undefined && balance > 0n && (
                <Flex justifyContent="center">
                  <T
                    fontStyle="italic"
                    fontWeight="700"
                    color={theme.colors.babyBlue}
                  >{`You get ${percentOfPool}% of these rewards!`}</T>
                </Flex>
              )}
            </Flex>
          )}
          {estimatedPosition && totalSupply === 0n && (
            <Flex
              borderTop={`2px solid ${theme.colors.lightBlue}`}
              py="0.5rem"
              flexDirection="column"
            >
              <Flex flexDirection="column" mb="0.5rem">
                <Header>Estimated TidePool Position</Header>
                <Text color="white" fontSize="0.85rem">
                  This would be the approximate range and estimated APR for a
                  deposit of $1,000. A live display will be available after deposit.
                </Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Flex flexDirection="column">
                  <T>{`Total ${tidePool?.pool.token0.symbol}: ${formatNumber(
                    formatUnits(
                      estimatedPosition.wei0,
                      tidePool?.pool.token0.decimals || 18
                    )
                  )}`}</T>
                  <T>{`Total ${tidePool?.pool.token1.symbol}: ${formatNumber(
                    formatUnits(
                      estimatedPosition.wei1,
                      tidePool?.pool.token1.decimals || 18
                    )
                  )}`}</T>
                  <T>{`Position value: $${estimatedPosition.depositAmount.toLocaleString()}`}</T>
                </Flex>
                <Flex flexDirection="column">
                  <T>
                    Upper limit:{" "}
                    {t0 &&
                      t1 &&
                      formatNumber(
                        tickToPrice(t0, t1, estimatedPosition.upper).toFixed(2)
                      )}
                  </T>
                  <T>
                    Lower limit:{" "}
                    {t0 &&
                      t1 &&
                      formatNumber(
                        tickToPrice(t0, t1, estimatedPosition.lower).toFixed(2)
                      )}
                  </T>
                  <T>{`APR: ${(
                    (estimatedPosition.fees365d /
                      estimatedPosition.depositAmount) *
                    100
                  ).toFixed(2)}%`}</T>
                </Flex>
              </Flex>
            </Flex>
          )}
          <Flex
            borderTop={`2px solid ${theme.colors.lightBlue}`}
            justifyContent="space-evenly"
            pt="1rem"
          >
            <Flex flexDirection="column">
              <ContractLink
                href={`${network.blockExplorer}address/${tidePool?.address}`}
                target="_blank"
              >
                TidePool <External height="1rem" width="1rem" />
              </ContractLink>
              <ContractLink
                href={`${network.blockExplorer}address/${tidePool?.poolAddress}`}
                target="_blank"
              >
                Uniswap pool <External height="1rem" width="1rem" />
              </ContractLink>
              <ContractLink
                href={getUniswapInfoLink(
                  network.name || "",
                  tidePool?.poolAddress || "",
                  "pools"
                )}
                target="_blank"
              >
                Uniswap analytics <External height="1rem" width="1rem" />
              </ContractLink>
            </Flex>
            <Flex flexDirection="column">
              <ContractLink
                href={`${network?.dexscreener}/${tidePool?.poolAddress}`}
                target="_blank"
              >
                Dexscreener
                <External height="1rem" width="1rem" />
              </ContractLink>
              <ContractLink
                href={`${network.blockExplorer}address/${tidePool?.pool.token0.address}`}
                target="_blank"
              >
                {tidePool?.pool.token0.symbol}{" "}
                <External height="1rem" width="1rem" />
              </ContractLink>
              <ContractLink
                href={`${network.blockExplorer}address/${tidePool?.pool.token1.address}`}
                target="_blank"
              >
                {tidePool?.pool.token1.symbol}{" "}
                <External height="1rem" width="1rem" />
              </ContractLink>
            </Flex>
          </Flex>
        </Box>
      )}
      {!hideEntryLink && (
        <Flex justifyContent="center" mt="1rem">
          <StyledButton
            onClick={() => router.push(`/${network.name}/${tidePool?.address}`)}
          >
            Enter
          </StyledButton>
        </Flex>
      )}
    </Box>
  )
}

export const Card = (props: {
  tidePool: TidePool
  balance: bigint | undefined
  position: Position | undefined
  estimatedPosition: EstimatedPosition | undefined
  totalSupply: bigint | undefined
  lastRebalance: bigint | undefined
  apr: number
  hideEntryLink?: boolean
}): JSX.Element => {
  return (
    <Container mb={["2rem"]} mx="auto" maxWidth="400px" width="100%" p="5px">
      <Info {...props} />
    </Container>
  )
}
