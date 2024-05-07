import { Flex, Connect } from "./index"
import { Wallet } from "./Icons"
import theme from "../info/theme"
import Link from "next/link"
import HamburgerMenu from "./HamburgerMenu"
import useModal from "../widgets/Modal/useModal"
import WalletSelectModal from "./WalletSelectModal"
import { useAccount, useDisconnect } from "wagmi"
import { useIsMounted } from "../hooks/useIsMounted"
import { useMemo } from "react"
import TidePoolsDarkLogo from "../components/svg/TidePoolsDarkLogo"
import { connectWalletGTM } from "../gtm/gtm"

export const Header = () => {
  const isMounted = useIsMounted()
  const { address: account } = useAccount()
  const { disconnect } = useDisconnect()

  const ws = <WalletSelectModal onDismiss={() => null} />
  const [onPresent] = useModal(ws, "walletModal")

  const WalletOrConnect = useMemo(() => {
    const wallet = (
      <Wallet
        height={"2rem"}
        color={theme.colors.yellow}
        onClick={() => disconnect()}
      />
    )
    if (account) return wallet
    const connect = (
      <Connect
        onClick={() => {
          connectWalletGTM()
          onPresent()
        }}
      >
        Connect
      </Connect>
    )
    return connect
  }, [account, onPresent, disconnect])

  if (!isMounted) return null

  return (
    <Flex py="1rem" px="0.5rem" alignItems="center">
      <Flex flex="1 1 auto" pr="1rem">
        <Link href="/">
          <TidePoolsDarkLogo height="4rem" width="100%" />
        </Link>
      </Flex>
      <Flex alignItems="center" justifyContent="space-evenly">
        {WalletOrConnect}
        <HamburgerMenu />
      </Flex>
    </Flex>
  )
}
