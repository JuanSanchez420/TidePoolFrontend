import { useContext } from "react"
import styled from "styled-components"
import { Flex, Button, Box } from "./index"
import useWeb3Modal from "../hooks/useWeb3Modal"
import { Global } from "../context/GlobalContext"
import { Hamburger, Wallet } from "./Icons"
import theme from "../info/theme"
import { Link } from "react-router-dom"

const Connect = styled(Button)`
    border-radius: 1rem;
    padding: 5px 15px;
    width: 7rem;

    background-color: ${(props) => props.theme.colors.yellow}

    :hover {
        background-color: ${(props) => props.theme.colors.darkYellow}
    }
`

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
`

const MenuLink = styled(Link)`
  text-decoration: none;
  color: black;

  :hover {
    text-decoration: underline;
  }
`

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
`

const TidePoolLogo = styled.img`
  height: 4rem;
`

export const Header = () => {
  const { account } = useContext(Global)
  const web3 = useWeb3Modal()

  return (
    <Flex py="1rem" px="0.5rem" alignItems="center">
      <Flex flex="1 1 auto">
        <Link to="/">
          <TidePoolLogo src="/images/DarkLogoWithTaglineHorizontal.png" />
        </Link>
      </Flex>
      <Flex alignItems="center">
        {account ? (
          <Wallet height={"2.5rem"} color={theme.colors.yellow} />
        ) : (
          <Connect onClick={() => web3.connect()}>Connect</Connect>
        )}
        <Menu>
          <Hamburger height={"3rem"} color={"#FFF"} />
          <MenuOptions id="menu" flexDirection="column" alignItems="start">
            <MenuLink to="/">Home</MenuLink>
            <MenuLink to="/create">Create</MenuLink>
            <MenuLink to="/faq">FAQ</MenuLink>
          </MenuOptions>
        </Menu>
      </Flex>
    </Flex>
  )
}
