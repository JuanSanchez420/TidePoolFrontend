import { useState, useContext } from "react"
import { Box, Flex, Text, Button } from "./index"
import { Chevron, External } from "./Icons"
import styled from "styled-components"
import { imageUrls } from "../info/tokens"
import { Slot0, TidePool } from "../info/types"
import { Global } from "../context/GlobalContext"
import theme from "../info/theme"
import { useNavigate } from "react-router-dom"

const Fee = styled(Box)`
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.red};
  padding: 3px 13px;
  color: white;
  font-weight: 700;
  font-size: 0.75rem;
`

export const Title = styled(Text)`
  color: ${(props) => props.theme.colors.babyBlue};
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
  background-color: ${(props) => props.theme.colors.darkBlue};
  filter: ${(props) => props.theme.utils.dropShadow};
`

const DetailsLink = styled.a`
  color: ${(props) => props.theme.colors.yellow};
  font-weight: 700;
  :hover {
    cursor: pointer;
  }
`

const ContractLink = styled.a`
  color: ${(props) => props.theme.colors.babyBlue};
  font-size: 0.85rem;
`


export const Info = (props: { tidePool?: TidePool; slot0?: Slot0 | null }) => {
  const { network } = useContext(Global)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const fee = props.tidePool ? props.tidePool?.pool.fee / 1e4 : 0

  return (
    <>
      <Flex pb="10px" alignItems="center" justifyContent="space-around" minWidth="330px">
        <Flex alignItems="center">
          <IconBox width="40px" height="35px" marginRight="1rem">
            <IconLeft
              src={
                props.tidePool
                  ? imageUrls[props.tidePool.pool.token0.symbol]
                  : ""
              }
            />
            <IconRight
              src={
                props.tidePool
                  ? imageUrls[props.tidePool.pool.token1.symbol]
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
      <Flex pb="10px" alignItems="center" justifyContent="space-around">
        <Text>&nbsp;</Text>
        <Flex>
          <Text color="white" fontSize="0.85rem">
            XX%
          </Text>
          <Text
            color={theme.colors.babyBlue}
            fontWeight="700"
            ml="5px"
            fontSize="0.85rem"
          >
            APR
          </Text>
        </Flex>
        <DetailsLink onClick={() => setOpen(!open)}>
          <Flex>
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
          <Flex justifyContent="center" mt="1rem">
            <Button onClick={()=> navigate(`/${network.name}/${props.tidePool?.address}`)}>Enter TidePool</Button>
          </Flex>
        </Box>
      )}
    </>
  )
}

export const Card = (props: {
  tidePool: TidePool
  slot0: Slot0 | null
}): JSX.Element => {
  return (
    <Container mb={["2rem"]} mx="auto" maxWidth="400px" width="100%" p="5px">
      <Info {...props} />
    </Container>
  )
}
