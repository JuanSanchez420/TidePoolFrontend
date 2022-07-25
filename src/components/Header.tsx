import { useContext } from "react";
import styled from "styled-components";
import { Flex, Button, Box, Text, StyledLink } from "./index";
import { networks, Network } from "../info/networks";
import useWeb3Modal from "../hooks/useWeb3Modal";
import { Global } from "../context/GlobalContext";
import { Hamburger, Wallet } from "./Icons";

const Connect = styled(Button)`
    border-radius: 0.5rem;
    padding: 5px 15px;
    width: 7rem;

    background-color: ${(props) => props.theme.colors.yellow}

    :hover {
        background-color: ${(props) => props.theme.colors.darkYellow}
    }
`;
const Logo = styled.img`
  height: 1rem;
  margin-right: 2px;
`;

const TidePoolLogo = styled.img`
  height: 3rem;
`;

const NetworkSelect = styled(Flex)`
  padding: 5px 10px;
  align-items: center;
  border-radius: 0.5rem;
  position: relative;
  width: 2rem;
  justify-content: center;
  cursor: pointer;
  z-index: 11;
  background-color: ${(props) => props.theme.colors.white};
  filter: ${(props) => props.theme.utils.dropShadow};

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 7rem;
  }

  :hover #wut {
    visibility: visible;
    transition-delay: 0s;
  }
`;

const NetworkSelectOptions = styled(Flex)`
  visibility: hidden;
  transition: 0.2s 1s;
  width: 150px;
  position: absolute;
  left: 0;
  right: 0;
  top: 3rem;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  filter: ${(props) => props.theme.utils.dropShadow};
  z-index: 11;
`;

const NetworkName = styled(Box)`
  display: none;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`;

const Highlight = styled(Text)`
  margin-left: 0.5rem;
  :hover {
    text-decoration: underline;
  }
`;

const Menu = styled(Box)`
  border-radius: 0.5rem;
  padding: 5px 15px;
  text-transform: none;
  margin-right: 1rem;
  position: relative;

  :hover #menu {
    visibility: visible;
    transition-delay: 0s;
  }
`;

const MenuOptions = styled(Flex)`
  visibility: hidden;
  transition: 0.2s 1s;
  width: 150px;
  position: absolute;
  // left: 0;
  right: 0;
  top: 3rem;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  filter: ${(props) => props.theme.utils.dropShadow};
  z-index: 11;
`;

export const Header = () => {
  const { account, network } = useContext(Global);
  const web3 = useWeb3Modal();

  return (
    <Flex py="1rem" px="0.5rem" alignItems="center">
      <Flex flex="1 1 auto">
        <a href="/">
          <TidePoolLogo src="/images/DarkLogoWithTaglineHorizontal.png" />
        </a>
      </Flex>
      <Flex alignItems="center">
        <NetworkSelect mr="1rem">
          <Flex alignItems="center">
            <Logo src={network.image} />
            <NetworkName>{network.name}</NetworkName>
          </Flex>
          <NetworkSelectOptions id="wut" flexDirection="column">
            <Box mb="1rem">Select a Network</Box>
            {networks.map((n: Network) => (
              <Flex
                key={n.chainId}
                alignItems="center"
                p="2px"
                onClick={() => web3.switchChains(n.chainId)}
              >
                <Logo src={n.image} />
                <Highlight>{n.name}</Highlight>
              </Flex>
            ))}
          </NetworkSelectOptions>
        </NetworkSelect>
        {account ? (
          <Wallet height={"3rem"} color={"#FFF"} />
        ) : (
          <Connect onClick={() => web3.connect()}>Connect</Connect>
        )}
        <Menu>
          <Hamburger height={"3rem"} color={"#FFF"} />
          <MenuOptions id="menu" flexDirection="column" alignItems="start">
            <StyledLink href="/">Home</StyledLink>
            <StyledLink href="/create">Create</StyledLink>
            <StyledLink href="/faq">FAQ</StyledLink>
          </MenuOptions>
        </Menu>
      </Flex>
    </Flex>
  );
};
