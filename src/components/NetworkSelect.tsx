import React, { SetStateAction, useContext } from "react"
import styled from "styled-components"
import { Flex, Box, Text } from "../components"
import theme from "../info/theme"
import { networks, Network } from "../info/networks"
import { Chevron } from "../components/Icons"
import { useSwitchNetwork } from "wagmi"
import { Global } from "../context/GlobalContext"
import { useIsMounted } from "../hooks/useIsMounted"

const NetworkSelect = styled(Flex)`
  font-size: 1rem;
  align-items: center;
  border-radius: 1rem;
  position: relative;
  justify-content: center;
  cursor: pointer;
  z-index: 11;
  width: 11rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.darkBlue};

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
  background-color: ${({ theme }) => theme.colors.buttonText};
  filter: ${({ theme }) => theme.utils.dropShadow};
  z-index: 11;
`
const Logo = styled.img`
  height: 1rem;
  margin-right: 5px;
  margin-left: 5px;
`

const Highlight = styled(Text)`
  margin-left: 0.5rem;
  :hover {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    border-radius: 1rem;
    span {
      visibility: visible;
    }
  }
`

const RedDot = styled.span`
  visibility: hidden;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.red};
  height: 5px;
  width: 5px;
  margin-right: 3px;
  margin-left: 3px;
`

export interface NetworkSelectProps {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
  network: Network
}

const NetworkSelectMenu = ({ open, setOpen, network }: NetworkSelectProps) => {
  const isMounted = useIsMounted()
  const { switchNetworkAsync } = useSwitchNetwork()
  const { setDefaultNetwork } = useContext(Global)

  const handleSwitchNetwork = async (chainId: number) => {
    try {
      if (switchNetworkAsync) {
        await switchNetworkAsync(chainId)
        setDefaultNetwork(chainId)
      } else {
        setDefaultNetwork(chainId)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const options = Object.values(networks).map((n: Network) => (
    <Highlight key={n.chainId}>
      <Flex
        alignItems="center"
        justifyContent="space-around"
        py="2px"
        onClick={() => handleSwitchNetwork(n.chainId)}
      >
        <Logo src={n.image} />
        <Text color={theme.colors.white}>{n.name}</Text>
        <RedDot />
      </Flex>
    </Highlight>
  ))

  if (!isMounted) return null

  return (
    <NetworkSelect mr="1rem">
      <Flex
        alignItems="center"
        onMouseOver={() => setOpen(true)}
        onMouseOut={() => setTimeout(() => setOpen(false), 1000)}
      >
        <Logo src={network.image} />
        <Text>{network.name}</Text>
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
        {options}
      </NetworkSelectOptions>
    </NetworkSelect>
  )
}

export default NetworkSelectMenu
