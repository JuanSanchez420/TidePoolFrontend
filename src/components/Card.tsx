import { useContext, useMemo, useState } from "react"
import { Box, Flex, Text, Button } from "./index"
import { Chevron, External } from "./Icons"
import styled from "styled-components"
import { imageUrls } from "../info/tokens"
import { TidePool } from "../info/types"
import theme from "../info/theme"
import Link from "next/link"
import { Position } from "@uniswap/v3-sdk"
import getUniswapInfoLink from "../utils/getUniswapInfoLink"
import { Arbitrum } from "../info/networks"
import { ethers } from "ethers"
import { Global } from "../context/GlobalContext"
import formatNumber from "../utils/formatNumber"
import { CurrencyAmount, Token } from "@uniswap/sdk-core"
import { useRouter } from "next/router"

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
  font-size: 0.85rem;
`

const APRLink = styled(Link)`
  color: white;
`

const T = styled(Text)`
  font-size: 0.85rem;
  color: white;
`

const Header = styled(Text)`
  font-size: 1rem;
  color: white;
`

export const Info = (props: {
  tidePool?: TidePool
  balance: ethers.BigNumber | undefined
  position: Position | undefined
  lastRebalance: ethers.BigNumber | undefined
  pendingRewards?: {
    rewards0: CurrencyAmount<Token>
    rewards1: CurrencyAmount<Token>
  }
  hideEntryLink?: boolean
}) => {
  const { network } = useContext(Global)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const {
    tidePool,
    balance,
    position,
    hideEntryLink,
    lastRebalance,
    pendingRewards,
  } = props

  const balanceFormatted = useMemo(() => {
    if (!balance) return "0"

    return parseFloat(ethers.utils.formatEther(balance)).toLocaleString()
  }, [balance])

  const fee = tidePool ? tidePool?.pool.fee / 1e4 : 0

  const [amount0, amount1, upper, lower] = useMemo(() => {
    if (!position) return ["0", "0", "0", "0"]
    const zero = ethers.utils.formatUnits(
      position.amount0.quotient.toString(),
      position.pool.token0.decimals
    )
    const one = ethers.utils.formatUnits(
      position.amount1.quotient.toString(),
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

  const formattedLastRebalance = useMemo(() => {
    if (!lastRebalance) return "N/A"
    const date = new Date(lastRebalance.toNumber() * 1000)
    return date.toLocaleString()
  }, [lastRebalance])

  const formattedPendingRewards = useMemo(() => {
    if (!pendingRewards) return "0"
    const { rewards0, rewards1 } = pendingRewards

    const zero = ethers.BigNumber.from(rewards0.quotient.toString())
    const one = ethers.BigNumber.from(rewards1.quotient.toString())
    const rewards = [
      `${rewards0.currency.symbol} ${formatNumber(ethers.utils.formatUnits(zero, rewards0.currency.decimals))}`,
      `${rewards1.currency.symbol} ${formatNumber(ethers.utils.formatUnits(one, rewards1.currency.decimals))}`,
    ]
    return rewards
  }, [pendingRewards])

  return (
    <Box>
      <Flex pb="10px" alignItems="center" justifyContent="space-around">
        <Flex alignItems="center">
          <IconBox width="40px" height="35px" marginRight="1rem">
            <IconLeft
              src={tidePool ? imageUrls[tidePool.pool.token0.symbol || ""] : ""}
            />
            <IconRight
              src={tidePool ? imageUrls[tidePool.pool.token1.symbol || ""] : ""}
            />
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
          {balance && balance.gt(0) ? (
            <Text color="white" fontSize="0.75rem">
              {`Balance: ${balanceFormatted} TPOOL`}
            </Text>
          ) : (
            <Text color="white" fontSize="0.75rem">
              &nbsp;
            </Text>
          )}
        </Flex>

        {network?.chainId !== Arbitrum.chainId ? (
          <Flex flex="2">
            <Text color="white" fontSize="0.85rem">
              <APRLink
                href={`/uniswap-v3-calculator/${network.name}/${tidePool?.poolAddress}`}
              >
                {tidePool?.APR ? `${formatNumber(tidePool?.APR)}% APR` : "Calculate APR"}
              </APRLink>
            </Text>
          </Flex>
        ) : null}
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
        <Box>
          {position && (
            <Flex
              borderTop={`2px solid ${theme.colors.lightBlue}`}
              py="0.5rem"
              flexDirection="column"
            >
              <Flex justifyContent="center">
                <Header>Current TidePool Position</Header>
              </Flex>
              <Flex justifyContent="space-evenly" alignItems="center">
                <Flex flexDirection="column">
                  <T>{`Total ${position.pool.token0.symbol}: ${amount0}`}</T>
                  <T>{`Total ${position.pool.token1.symbol}: ${amount1}`}</T>
                </Flex>
                <Flex flexDirection="column">
                  <T>Upper limit: {upper}</T>
                  <T>Lower limit: {lower}</T>
                </Flex>
              </Flex>
              {formattedLastRebalance && (
                <Flex justifyContent="center">
                  <T>{`Last rebalanced on: ${formattedLastRebalance}`}</T>
                </Flex>
              )}
              {formattedPendingRewards && (
                <Flex justifyContent="center">
                  <T>{`Rewards earned since last rebalance: ${formattedPendingRewards[0]}, ${formattedPendingRewards[1]}`}</T>
                </Flex>
              )}
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
          {!hideEntryLink && (
            <Flex justifyContent="center" mt="1rem">
              <Button
                onClick={() =>
                  router.push(`/${network.name}/${tidePool?.address}`)
                }
              >
                Enter TidePool
              </Button>
            </Flex>
          )}
        </Box>
      )}
    </Box>
  )
}

export const Card = (props: {
  tidePool: TidePool
  balance: ethers.BigNumber | undefined
  position: Position | undefined
  lastRebalance: ethers.BigNumber | undefined
  apr: number
  hideEntryLink?: boolean
}): JSX.Element => {
  return (
    <Container mb={["2rem"]} mx="auto" maxWidth="400px" width="100%" p="5px">
      <Info {...props} />
    </Container>
  )
}
