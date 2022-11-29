import { useEffect } from "react"
import styled from "styled-components"
import { Flex, Button } from "./index"
import { Wallet } from "./Icons"
import theme from "../info/theme"
import { Link } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import HamburgerMenu from "./HamburgerMenu"
import useWallet from "../hooks/useWallet"

const Connect = styled(Button)`
    border-radius: 1rem;
    padding: 5px 15px;
    width: 7rem;

    background-color: ${(props) => props.theme.colors.yellow}

    :hover {
        background-color: ${(props) => props.theme.colors.darkYellow}
    }
`

const TidePoolLogo = styled.img`
  height: 4rem;
`

export const Header = () => {
  const { account } = useWeb3React()
  const { handleActivate } = useWallet()

  return (
    <Flex py="1rem" px="0.5rem" alignItems="center" flexShrink="0">
      <Flex flex="1 1 auto">
        <Link to="/">
          <TidePoolLogo src="/images/TidePoolsDarkLogo.svg" />
        </Link>
      </Flex>
      <Flex alignItems="center">
        {account ? (
          <Wallet height={"2rem"} color={theme.colors.yellow} />
        ) : (
          <Connect onClick={() => handleActivate()}>Connect</Connect>
        )}
        <HamburgerMenu />
      </Flex>
    </Flex>
  )
}
