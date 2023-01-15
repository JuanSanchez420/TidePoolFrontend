import styled from "styled-components"
import { Flex, Connect } from "./index"
import { Wallet } from "./Icons"
import theme from "../info/theme"
import { Link } from "react-router-dom"
import HamburgerMenu from "./HamburgerMenu"
import useModal from "../widgets/Modal/useModal"
import WalletSelectModal from "./WalletSelectModal"
import { useAccount, useDisconnect } from "wagmi"

const TidePoolLogo = styled.img`
  height: 4rem;
  width: 100%;
`

export const Header = () => {
  const { address: account } = useAccount()
  const { disconnect } = useDisconnect()

  const ws = <WalletSelectModal onDismiss={() => null} />
  const [onPresent] = useModal(ws, "walletModal")

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
            onClick={() => disconnect()}
          />
        ) : (
          <Connect onClick={onPresent}>Connect</Connect>
        )}
        <HamburgerMenu />
      </Flex>
    </Flex>
  )
}
