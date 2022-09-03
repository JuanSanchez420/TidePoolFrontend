import { useState, useContext, useMemo } from "react"
import { Global } from "../context/GlobalContext"
import styled from "styled-components"
import { Flex, Box, Heading, Text } from "../components"
import theme from "../info/theme"
import { networks, Network } from "../info/networks"
import useWeb3Modal from "../hooks/useWeb3Modal"
import { Chevron, Search } from "../components/Icons"
import { TextInput } from "../components/Input"
import { Card } from "../components/Card"

const Logo = styled.img`
  height: 1rem;
  margin-right: 5px;
  margin-left: 5px;
`

const NetworkSelect = styled(Flex)`
  font-size: 1rem;
  align-items: center;
  border-radius: 1rem;
  position: relative;
  justify-content: center;
  cursor: pointer;
  z-index: 11;
  width: 11rem;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.darkBlue};

  :hover #wut {
    visibility: visible;
    transition-delay: 0s;
  }
`

const NetworkSelectOptions = styled(Flex)`
  visibility: hidden;
  transition: 0.2s 1s;
  width: 170px;
  position: absolute;
  left: 0;
  right: 0;
  top: 3rem;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.buttonText};
  filter: ${(props) => props.theme.utils.dropShadow};
  z-index: 11;
`

const Highlight = styled(Text)`
  margin-left: 0.5rem;
  :hover {
    background-color: ${(props) => props.theme.colors.darkBlue};
    border-radius: 1rem;
    span {
      visibility: visible;
    }
  }
`

const RedDot = styled.span`
  visibility: hidden;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.red};
  height: 5px;
  width: 5px;
  margin-right: 3px;
  margin-left: 3px;
`

const List = () => {
  const web3 = useWeb3Modal()
  const [open, setOpen] = useState(false)
  const g = useContext(Global)
  const [search, setSearch] = useState("")

  const view = useMemo(() => {
    if (search === "") return g.theList.tidePools

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
    )
  }, [search, g.theList.tidePools])

  return (
    <Box p="1rem">
      <Heading>TidePools</Heading>
      <Text mb="1rem" color={theme.colors.white}>
        Start earning passive crypto income with our automated V3 liquidity
        pools.
      </Text>
      <Flex justifyContent="center" mb="1rem">
        <NetworkSelect mr="1rem">
          <Flex
            alignItems="center"
            onMouseOver={() => setOpen(true)}
            onMouseOut={() => setTimeout(() => setOpen(false), 1000)}
          >
            <Logo src={g.network.image} />
            <Text>{g.network.name}</Text>
            <Box width="15px" mx="5px" color={theme.colors.white}>
              <Chevron open={open} />
            </Box>
          </Flex>
          <NetworkSelectOptions id="wut" flexDirection="column">
            <Text
              mb="0.75rem"
              color={theme.colors.babyBlue}
              textAlign="center"
              fontWeight="200"
            >
              Select a Network
            </Text>
            {networks.map((n: Network) => (
              <Highlight key={n.chainId}>
                <Flex
                  key={n.chainId}
                  alignItems="center"
                  justifyContent="space-around"
                  py="2px"
                  onClick={() => web3.switchChains(n.chainId)}
                >
                  <Logo src={n.image} />
                  <Text color={theme.colors.white}>{n.name}</Text>
                  <RedDot />
                </Flex>
              </Highlight>
            ))}
          </NetworkSelectOptions>
        </NetworkSelect>
        <TextInput
          value={search}
          setValue={setSearch}
          icon={<Search height="2rem" width="2rem" color="white" />}
        />
      </Flex>
      {view.map(c=><Card key={c.address} tidePool={c} slot0={null}/>)}
    </Box>
  )
}

export default List
