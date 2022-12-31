import styled from "styled-components"
import { Flex, Button } from "./index"
import { Wallet } from "./Icons"
import theme from "../info/theme"
import { Link } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import HamburgerMenu from "./HamburgerMenu"
import useModal from "../widgets/Modal/useModal"
import WalletSelectModal from "./WalletSelectModal"
import useEagerConnect from "../hooks/useEagerConnect"
import useWallet from "../hooks/useWallet"

const Connect = styled(Button)`
    border-radius: 1rem;
    width: 100%;
    padding: 5px 15px;
    background-color: ${({ theme }) => theme.colors.yellow}

    :hover {
        background-color: ${({ theme }) => theme.colors.darkYellow}
    }

    ${({ theme }) => theme.mediaQueries.sm} {
        width: 7rem;
    };
`

const TidePoolLogo = styled.img`
  height: 4rem;
  width: 100%;
`

export const Header = () => {
  const { account } = useWeb3React()
  const ws = <WalletSelectModal onDismiss={() => null} />
  const [onPresent] = useModal(ws, "walletModal")
  const { disconnect } = useWallet()

  useEagerConnect()

  return (
    <Flex py="1rem" px="0.5rem" alignItems="center" flexShrink="0">
      <Flex flex="1 1 auto">
        <Link to="/">
          <TidePoolLogo src="/images/TidePoolsDarkLogo.svg" />
        </Link>
      </Flex>
      <Flex alignItems="center">
        {account ? (
          <Wallet
            height={"2rem"}
            color={theme.colors.yellow}
            onClick={disconnect}
          />
        ) : (
          <Connect onClick={onPresent}>Connect</Connect>
        )}
        <HamburgerMenu />
      </Flex>
    </Flex>
  )
}
