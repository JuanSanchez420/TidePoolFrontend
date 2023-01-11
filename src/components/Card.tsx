import { useMemo, useState } from "react"
import { Box, Flex, Text, Button } from "./index"
import { Chevron, External } from "./Icons"
import styled from "styled-components"
import { imageUrls } from "../info/tokens"
import { TidePool } from "../info/types"
import theme from "../info/theme"
import { Link, useNavigate } from "react-router-dom"
import { Pool } from "@uniswap/v3-sdk"
import getUniswapInfoLink from "../utils/getUniswapInfoLink"
import { Arbitrum } from "../info/networks"
import useNetwork from "../hooks/useNetwork"
import useTidePool from "../hooks/useTidePool"
import { ethers } from "ethers"

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

export const Info = (props: {
  tidePool?: TidePool
  pool: Pool | undefined
  hideEntryLink?: boolean
}) => {
  const network = useNetwork()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const { balance } = useTidePool(props.tidePool?.address)

  const balanceFormatted = useMemo(() => {
    if (!balance) return "0"

    return parseFloat(ethers.utils.formatEther(balance)).toLocaleString()
  }, [balance])

  const fee = props.tidePool ? props.tidePool?.pool.fee / 1e4 : 0

  return (
    <Box >
      <Flex pb="10px" alignItems="center" justifyContent="space-around">
        <Flex alignItems="center">
          <IconBox width="40px" height="35px" marginRight="1rem">
            <IconLeft
              src={
                props.tidePool
                  ? imageUrls[props.tidePool.pool.token0.symbol || ""]
                  : ""
              }
            />
            <IconRight
              src={
                props.tidePool
                  ? imageUrls[props.tidePool.pool.token1.symbol || ""]
                  : ""
              }
            />
          </IconBox>
          <Title>
            {props.tidePool?.pool.token0?.symbol} -{" "}
            {props.tidePool?.pool.token1?.symbol}
          </Title>
        </Flex>
        <Fee>{fee}% Fee</Fee>
      </Flex>
      <Flex pb="10px" alignItems="center" justifyContent="space-evenly" px="15px">
        <Flex flexDirection="column" flex="1">
          {balance.gt(0) ? <Text color="white" fontSize="0.75rem">
            {`Balance: ${balanceFormatted}`}
          </Text> : <Text color="white" fontSize="0.75rem">&nbsp;</Text>}
        </Flex>

        {network?.chainId !== Arbitrum.chainId ? (
          <Flex flex="2">
            <Text color="white" fontSize="0.85rem">
              <APRLink
                to={`/uniswap-v3-calculator/${props.tidePool?.pool.address}`}
              >
                {props.tidePool?.APR ? `${props.tidePool?.APR}% APR` : "Calculate APR"}
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
          <Flex
            borderTop={`2px solid ${theme.colors.lightBlue}`}
            justifyContent="space-evenly"
            pt="1rem"
          >
            <Flex flexDirection="column">
              <ContractLink
                href={`${network.blockExplorer}address/${props.tidePool?.address}`}
                target="_blank"
              >
                TidePool <External height="1rem" width="1rem" />
              </ContractLink>
              <ContractLink
                href={`${network.blockExplorer}address/${props.tidePool?.pool.address}`}
                target="_blank"
              >
                Uniswap pool <External height="1rem" width="1rem" />
              </ContractLink>
              <ContractLink
                href={getUniswapInfoLink(
                  network.name || "",
                  props.tidePool?.pool.address || "",
                  "pools"
                )}
                target="_blank"
              >
                Uniswap analytics <External height="1rem" width="1rem" />
              </ContractLink>
            </Flex>
            <Flex flexDirection="column">
              <ContractLink
                href={`${network.blockExplorer}address/${props.tidePool?.pool.token0.address}`}
                target="_blank"
              >
                {props.tidePool?.pool.token0.symbol}{" "}
                <External height="1rem" width="1rem" />
              </ContractLink>
              <ContractLink
                href={`${network.blockExplorer}address/${props.tidePool?.pool.token1.address}`}
                target="_blank"
              >
                {props.tidePool?.pool.token1.symbol}{" "}
                <External height="1rem" width="1rem" />
              </ContractLink>
            </Flex>
          </Flex>
          {!props.hideEntryLink && (
            <Flex justifyContent="center" mt="1rem">
              <Button
                onClick={() =>
                  navigate(`/${network.name}/${props.tidePool?.address}`)
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
  pool: Pool | undefined
  apr: number
  hideEntryLink?: boolean
}): JSX.Element => {
  return (
    <Container mb={["2rem"]} mx="auto" maxWidth="400px" width="100%" p="5px">
      <Info {...props} />
    </Container>
  )
}
