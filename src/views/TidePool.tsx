import { useState, useContext, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import {
  Box,
  Button,
  Flex,
  FlexProps,
  OrderedList,
} from "../components/index"
import { Container, Info } from "../components/Card"
import { BigNumber } from "ethers"
import { Global } from "../context/GlobalContext"
import styled from "styled-components"
import { TokenInput } from "../components/Input"
import useToken from "../hooks/useToken"
import useTidePool from "../hooks/useTidePool"
import { ApprovalState } from "../info/types"
import usePool from "../hooks/usePool"
import { Link } from "react-router-dom"
import theme from "../info/theme"
import { useWeb3React } from "@web3-react/core"

const EthAmount = styled(TokenInput)`
  text-align: center;
  margin-bottom: 0.5rem;
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
  const address = useParams().address

  const { theList } = useContext(Global)

  const { account } = useWeb3React()

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

  const { deposit, withdraw, balance, calculateFee } = useTidePool(
    tidePool?.address,
    account
  )
  const { pool } = usePool(tidePool?.pool.address)
  const [index, setIndex] = useState(0)
  const [zeroIn, setZeroIn] = useState<BigNumber>(BigNumber.from(0))
  const [oneIn, setOneIn] = useState<BigNumber>(BigNumber.from(0))
  const [w, setW] = useState<BigNumber>(BigNumber.from(0))
  const loaded = useRef(false)
  const [apr, setApr] = useState<number>(0)

  useEffect(() => {
    const f = async () => {
      loaded.current = true
      setApr(await calculateFee())
    }
    if (!loaded.current && tidePool && pool) f()
  }, [tidePool, pool, calculateFee])

  const doDeposit = async () => {
    try {
      await deposit(zeroIn, oneIn)
    } catch (e) {
      console.log(e)
    }
  }

  const doWithdraw = async () => {
    try {
      await withdraw()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Box p="1rem" mx="auto" width="100%" maxWidth="600px">
      <Flex justifyContent="center">
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
        <Info tidePool={tidePool} pool={pool} apr={apr} hideEntryLink />

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
          {index === 0 ? (
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
                    disabled={!account}
                    onClick={() => approveT0()}
                    style={{ width: "100%" }}
                  >
                    Approve {token0?.symbol}
                  </Button>
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
                    disabled={!account}
                    onClick={() => approveT1()}
                    style={{ width: "100%" }}
                  >
                    Approve {token1?.symbol}
                  </Button>
                )}
              </Box>
              {t0State === ApprovalState.APPROVED ||
              t1State === ApprovalState.APPROVED ? (
                <Flex justifyContent="center" width="100%">
                  <Button onClick={() => doDeposit()}>Deposit</Button>
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
                  <Button onClick={() => doWithdraw()}>Withdraw</Button>
                </Flex>
              ) : null}
            </Flex>
          )}
        </ActionBox>
      </Container>
      <Flex justifyContent="center" my="1rem">
        <BackLink to="/pools">Back to all pools</BackLink>
      </Flex>
    </Box>
  )
}

export default TidePool
