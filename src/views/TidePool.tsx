import { useState, useContext, useEffect, useRef } from "react"
import {
  Box,
  Button,
  Connect,
  Dots,
  Flex,
  FlexProps,
  Heading,
  OrderedList,
  Text,
} from "../components/index"
import { Container, Info } from "../components/Card"
import { Global } from "../context/GlobalContext"
import styled from "styled-components"
import { TokenInput } from "../components/Input"
import useToken from "../hooks/useToken"
import useTidePool from "../hooks/useTidePool"
import { ApprovalState } from "../info/types"
import Link from "next/link"
import useModal from "../widgets/Modal/useModal"
import WalletSelectModal from "../components/WalletSelectModal"
import { useAccount } from "wagmi"
import formatNumber from "../utils/formatNumber"
import { useRouter } from "next/router"
import { useIsMounted } from "../hooks/useIsMounted"
import { getNetworkByName } from "../info/networks"
import useUSDPrice from "../hooks/useUSDPrice"
import { depositGTM } from "../gtm/gtm"
import { parseUnits, formatUnits } from "viem"

const EthAmount = styled(TokenInput)`
  text-align: center;
  margin-bottom: 0.5rem;
`

const ExternalLink = styled(Link)`
  padding: 0.1rem;
  color: white;
`

const BackLink = styled(Link)`
  color: white;
  text-align: center;
  :hover {
    text-decoration: underline;
  }
`

interface TabProps extends FlexProps {
  selected: boolean
}

const Tab = styled(Box) <TabProps>`
  width: 100%;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.lighterBlue : theme.colors.darkishBlue};
  color: white;
  text-align: center;
  padding: 1rem;

  :hover {
    cursor: pointer;
  }
`

const ActionBox = styled(Flex) <TabProps>`
  margin-top: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.lighterBlue : theme.colors.darkishBlue};
`

const TidePool = () => {
  const isMounted = useIsMounted()
  const refreshedList = useRef(false)
  const router = useRouter()
  const networkName = router.query.network
  const address = router.query.address
  const { address: account } = useAccount()

  const { theList, setDefaultNetwork, network } = useContext(Global)

  const tidePool = theList.tidePools.find((p) => p.address === address)

  useEffect(() => {
    if (!refreshedList.current && theList.update) {
      refreshedList.current = true
      theList.update()
    }
  }, [theList])

  useEffect(() => {
    if (networkName) {
      setDefaultNetwork(getNetworkByName(networkName as string).chainId)
    }
  }, [networkName, setDefaultNetwork])

  const {
    token: token0,
    state: t0State,
    balance: t0Balance,
    getBalance: getT0Balance,
    approve: approveT0,
  } = useToken(tidePool?.pool.token0.address, account, tidePool?.address)
  const {
    token: token1,
    state: t1State,
    balance: t1Balance,
    getBalance: getT1Balance,
    approve: approveT1,
  } = useToken(tidePool?.pool.token1.address, account, tidePool?.address)

  const {
    deposit,
    withdraw,
    balance,
    position,
    totalSupply,
    lastRebalance,
    pendingRewards,
    estimatedPosition,
  } = useTidePool(tidePool?.address)

  const [index, setIndex] = useState(0)
  const [zeroIn, setZeroIn] = useState<string>("")
  const [oneIn, setOneIn] = useState<string>("")
  const ws = <WalletSelectModal onDismiss={() => null} />
  const [onPresent] = useModal(ws, "walletModal")
  const [pendingTx, setPendingTx] = useState({
    deposit: false,
    withdraw: false,
    approveT0: false,
    approveT1: false,
  })

  const t0USD = useUSDPrice(token0?.address)
  const t1USD = useUSDPrice(token1?.address)

  const call = async (func: () => Promise<void>, label: string) => {
    try {
      setPendingTx({ ...pendingTx, [label]: true })
      await func()
    } catch (e) {
      console.log(e)
    } finally {
      setPendingTx({ ...pendingTx, [label]: false })
    }
  }

  const doWithdraw = async () => {
    try {
      setPendingTx({ ...pendingTx, withdraw: true })
      await withdraw()
      await getT0Balance()
      await getT1Balance()
    } catch (e: any) {
      console.log(e)
    } finally {
      setPendingTx({ ...pendingTx, withdraw: false })
    }
  }

  const doDeposit = async () => {
    try {
      setPendingTx({ ...pendingTx, deposit: true })
      await deposit(
        parseUnits(zeroIn !== "" ? zeroIn : "0", token0?.decimals || 18),
        parseUnits(oneIn !== "" ? oneIn : "0", token1?.decimals || 18)
      )
      await getT0Balance()
      await getT1Balance()
      const t0 = zeroIn !== "" ? parseFloat(zeroIn) : 0
      const t1 = oneIn !== "" ? parseFloat(oneIn) : 0
      depositGTM(t0USD * t0 + t1USD * t1)
      setZeroIn("0")
      setOneIn("0")
    } catch (e: any) {
      if (e.reason === "execution reverted: L0")
        alert("Deposit too low. Please increase amount of one or both tokens.")
      console.log(e)
    } finally {
      setPendingTx({ ...pendingTx, deposit: false })
    }
  }

  if (!isMounted) return null

  return (
    <Box p="1rem" mx="auto" width="100%" maxWidth="600px">
      <Heading>Enter this TidePool</Heading>
      <Flex justifyContent="center" flexDirection="column">
        <OrderedList>
          <li>
            Approve either {token0?.symbol} or {token1?.symbol}, or both
          </li>
          <li>
            Deposit any amounts of {token0?.symbol} or {token1?.symbol}
          </li>
          <li>That's it! We do the rest. Withdraw whenever you want.</li>
        </OrderedList>
      </Flex>
      <Container mx="auto" my="1rem">
        <Info
          tidePool={tidePool}
          balance={balance}
          position={position}
          estimatedPosition={estimatedPosition || undefined}
          totalSupply={totalSupply}
          lastRebalance={lastRebalance}
          pendingRewards={pendingRewards}
          hideEntryLink
        />

        <ActionBox flexDirection="column" selected={index === 0}>
          <Flex>
            <Tab
              selected={true}
              borderRadius="1rem 0 0 0"
              onClick={() => setIndex(0)}
            >
              Deposit
            </Tab>
            <Tab
              selected={false}
              borderRadius="0 1rem 0 0"
              onClick={() => setIndex(1)}
            >
              Withdraw
            </Tab>
          </Flex>
          {!account ? (
            <Flex justifyContent="center" my="1rem">
              <Connect onClick={onPresent}>Connect</Connect>
            </Flex>
          ) : index === 0 ? (
            <Flex
              flexDirection="column"
              p="1rem"
              alignItems="center"
              width="100%"
            >
              <Box mb="1rem" width="100%">
                {t0State === ApprovalState.APPROVED ? (
                  <EthAmount
                    token={token0}
                    balance={t0Balance}
                    value={zeroIn}
                    setValue={setZeroIn}
                  />
                ) : (
                  <Button
                    disabled={!account || pendingTx.approveT0}
                    onClick={() => call(approveT0, "approveT0")}
                    style={{ width: "100%" }}
                  >
                    {pendingTx.approveT0 ? (
                      <Dots>Approving</Dots>
                    ) : (
                      `Approve ${token0?.symbol}`
                    )}
                  </Button>
                )}
                <Text
                  fontSize="0.75rem"
                  color="white"
                  textAlign="right"
                  pr="1rem"
                >
                  {`${token0?.symbol?.toUpperCase()} Balance: ${formatNumber(
                    formatUnits(t0Balance || 0n, token0?.decimals || 18)
                  )}`}
                </Text>
              </Box>

              <Box mb="1rem" width="100%">
                {t1State === ApprovalState.APPROVED ? (
                  <EthAmount
                    token={token1}
                    balance={t1Balance}
                    value={oneIn}
                    setValue={setOneIn}
                  />
                ) : (
                  <Button
                    disabled={!account || pendingTx.approveT1}
                    onClick={() => call(approveT1, "approveT1")}
                    style={{ width: "100%" }}
                  >
                    {pendingTx.approveT1 ? (
                      <Dots>Approving</Dots>
                    ) : (
                      `Approve ${token1?.symbol}`
                    )}
                  </Button>
                )}
                <Text
                  fontSize="0.75rem"
                  color="white"
                  textAlign="right"
                  pr="1rem"
                >
                  {`${token1?.symbol?.toUpperCase()} Balance: ${formatNumber(
                    formatUnits(t1Balance || 0n, token1?.decimals || 18)
                  )}`}
                </Text>
              </Box>
              {t0State === ApprovalState.APPROVED ||
                t1State === ApprovalState.APPROVED ? (
                <Flex justifyContent="center" width="100%">
                  <Button
                    disabled={pendingTx.deposit}
                    onClick={() => doDeposit()}
                  >
                    {pendingTx.deposit ? <Dots>Depositing</Dots> : "Deposit"}
                  </Button>
                </Flex>
              ) : null}
            </Flex>
          ) : (
            <Flex flexDirection="column" p="1rem" alignItems="center">
              <Box mb="1rem">
                <Text color="white" textAlign="right" pr="1rem">
                  Balance:
                  {` ${formatNumber(formatUnits(balance || 0n, 18))}`}
                </Text>
              </Box>
              <Flex justifyContent="center" width="100%">
                <Button
                  disabled={pendingTx.withdraw || !balance || balance === 0n}
                  onClick={() => doWithdraw()}
                >
                  {pendingTx.withdraw ? <Dots>Withdrawing</Dots> : "Withdraw"}
                </Button>
              </Flex>
            </Flex>
          )}
        </ActionBox>
      </Container>
      <Flex flexDirection="column" justifyContent="center" my="1rem">
        <BackLink href="/pools">Back to all pools</BackLink>
        <Text color="white" mt="1rem">
          For a more detailed explanation, visit{" "}
          <ExternalLink href="/how-it-works" target="_blank">
            How It Works
          </ExternalLink>
          ,{" "}
          <ExternalLink href="/what-is-impermanent-loss" target="_blank">
            Impermanent Loss
          </ExternalLink>
          , or{" "}
          <ExternalLink
            href="/how-to-provide-liquidity-profitably"
            target="_blank"
          >
            How to Provide Liquidity Profitably
          </ExternalLink>
          .
        </Text>
      </Flex>
    </Box>
  )
}

export default TidePool
