import { useState, useContext } from "react"
import {
  Box,
  Button,
  Connect,
  Dots,
  Flex,
  FlexProps,
  OrderedList,
  Text,
} from "../components/index"
import { Container, Info } from "../components/Card"
import { BigNumber, ethers } from "ethers"
import { Global } from "../context/GlobalContext"
import styled from "styled-components"
import { TokenInput } from "../components/Input"
import useToken from "../hooks/useToken"
import useTidePool from "../hooks/useTidePool"
import { ApprovalState } from "../info/types"
import Link from "next/link"
import theme from "../info/theme"
import useModal from "../widgets/Modal/useModal"
import WalletSelectModal from "../components/WalletSelectModal"
import { useAccount } from "wagmi"
import formatNumber from "../utils/formatNumber"
import { useRouter } from 'next/router'

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
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`

interface TabProps extends FlexProps {
  selected: boolean
}

const Tab = styled(Box)<TabProps>`
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

const ActionBox = styled(Flex)<TabProps>`
  margin-top: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.lighterBlue : theme.colors.darkishBlue};
`

const TidePool = () => {
  const router = useRouter()
  const address = router.query.address
  const { address: account } = useAccount()

  const { theList } = useContext(Global)

  const tidePool = theList.tidePools.find((p) => p.address === address)

  const {
    token: token0,
    state: t0State,
    balance: t0Balance,
    approve: approveT0,
  } = useToken(tidePool?.pool.token0.address, account, tidePool?.address)
  const {
    token: token1,
    state: t1State,
    balance: t1Balance,
    approve: approveT1,
  } = useToken(tidePool?.pool.token1.address, account, tidePool?.address)

  const {
    deposit,
    withdraw,
    balance,
    position,
    lastRebalance,
    pendingRewards,
  } = useTidePool(tidePool?.address)

  const [index, setIndex] = useState(0)
  const [zeroIn, setZeroIn] = useState<BigNumber>(BigNumber.from(0))
  const [oneIn, setOneIn] = useState<BigNumber>(BigNumber.from(0))
  const [w, setW] = useState<BigNumber>(BigNumber.from(0))
  const ws = <WalletSelectModal onDismiss={() => null} />
  const [onPresent] = useModal(ws, "walletModal")
  const [pendingTx, setPendingTx] = useState({
    deposit: false,
    withdraw: false,
    approveT0: false,
    approveT1: false,
  })

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

  const doDeposit = async () => {
    try {
      setPendingTx({ ...pendingTx, deposit: true })
      await deposit(zeroIn, oneIn)
    } catch (e) {
      console.log(e)
    } finally {
      setPendingTx({ ...pendingTx, deposit: false })
    }
  }

  return (
    <Box p="1rem" mx="auto" width="100%" maxWidth="600px">
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
        <Text color="white" textAlign="center">
          For a more detailed explanation, visit{" "}
          <ExternalLink href="/how-it-works" target="_blank">
            How It Works
          </ExternalLink>
          .
        </Text>
      </Flex>
      <Container mx="auto" my="1rem">
        <Info
          tidePool={tidePool}
          balance={balance}
          position={position}
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
                {t0Balance && (
                  <Text
                    fontSize="0.75rem"
                    color="white"
                    textAlign="right"
                    pr="1rem"
                  >
                    Balance:{" "}
                    {formatNumber(
                      ethers.utils.formatUnits(t0Balance, token0?.decimals)
                    )}
                  </Text>
                )}
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
                {t1Balance && (
                  <Text
                    fontSize="0.75rem"
                    color="white"
                    textAlign="right"
                    pr="1rem"
                  >
                    Balance:{" "}
                    {formatNumber(
                      ethers.utils.formatUnits(t1Balance, token1?.decimals)
                    )}
                  </Text>
                )}
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
                <EthAmount
                  balance={balance}
                  value={w}
                  setValue={setW}
                  color={theme.colors.lighterBlue}
                />
              </Box>

              {t0State === ApprovalState.APPROVED ||
              t1State === ApprovalState.APPROVED ? (
                <Flex justifyContent="center" width="100%">
                  <Button
                    disabled={pendingTx.withdraw}
                    onClick={() => call(withdraw, "withdraw")}
                  >
                    {pendingTx.withdraw ? <Dots>Withdrawing</Dots> : "Withdraw"}
                  </Button>
                </Flex>
              ) : null}
            </Flex>
          )}
        </ActionBox>
      </Container>
      <Flex justifyContent="center" my="1rem">
        <BackLink href="/pools">Back to all pools</BackLink>
      </Flex>
    </Box>
  )
}

export default TidePool
