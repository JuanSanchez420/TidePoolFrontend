import { useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { Box, Button, Flex } from "../components/index"
import { Container, Info } from "../components/Card"
import { BigNumber } from "ethers"
import { Global } from "../context/GlobalContext"
import styled from "styled-components"
import { TokenInput } from "../components/Input"
import useToken from "../hooks/useToken"
import useTidePool from "../hooks/useTidePool"
import { ApprovalState } from "../info/types"
import usePool from "../hooks/usePool"
import { Link} from "react-router-dom"

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

/*

interface TabProps extends FlexProps {
  selected: boolean
}

const Tab = styled(Box)<TabProps>`
  width: 100%;
  background-color: ${(props) =>
    props.selected
      ? props.theme.colors.lighterBlue
      : props.theme.colors.darkishBlue};
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
  background-color: ${(props) =>
    props.selected
      ? props.theme.colors.lighterBlue
      : props.theme.colors.darkishBlue};
`

          <ActionBox flexDirection="column" selected={index === 0}>
            <Flex>
              <Tab selected={true} borderRadius="1rem 0 0 0" onClick={()=>setIndex(0)}>
                Deposit
              </Tab>
              <Tab selected={false} borderRadius="0 1rem 0 0" onClick={()=>setIndex(1)}>
                Withdraw
              </Tab>
            </Flex>
            <Flex flexDirection="column" p="1rem">
              <Box mb="1rem">
                <Text color="white">misc notes</Text>
              </Box>
              <Box mb="1rem">
                <TextInput value={t0} setValue={setT0} />
              </Box>
              <Box mb="1rem">
                <TextInput value={t1} setValue={setT1} />
              </Box>
              <Box>Button</Box>
            </Flex>
          </ActionBox>

*/

const TidePool = () => {
  const address = useParams().address

  const { account, theList } = useContext(Global)

  const tidePool = theList.tidePools.find((p) => p.address === address)

  const {
    state: t0State,
    balance: t0Balance,
    approve: approveT0,
  } = useToken(tidePool?.pool.token0.address, account, tidePool?.address)
  const {
    state: t1State,
    balance: t1Balance,
    approve: approveT1,
  } = useToken(tidePool?.pool.token1.address, account, tidePool?.address)

  const { deposit, withdraw, balance } = useTidePool(tidePool?.address, account)
  const { slot0 } = usePool(tidePool?.pool.address)

  const [zeroIn, setZeroIn] = useState<BigNumber>(BigNumber.from(0))
  const [oneIn, setOneIn] = useState<BigNumber>(BigNumber.from(0))

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
    <Box>
      <Container maxWidth="400px" width="100%" mx="auto" my="1rem">
        <Info tidePool={tidePool} slot0={slot0} />
        <Flex justifyContent="center" my="1rem">
          {t0State === ApprovalState.APPROVED ? (
            <EthAmount
              token={tidePool?.pool.token0}
              balance={t0Balance}
              value={zeroIn}
              setValue={setZeroIn}
            />
          ) : (
            <Button disabled={!account} onClick={() => approveT0()}>
              Approve {tidePool?.pool.token0.symbol}
            </Button>
          )}
        </Flex>
        <Flex justifyContent="center">
          {t1State === ApprovalState.APPROVED ? (
            <EthAmount
              token={tidePool?.pool.token1}
              balance={t1Balance}
              value={oneIn}
              setValue={setOneIn}
            />
          ) : (
            <Button disabled={!account} onClick={() => approveT1()}>
              Approve {tidePool?.pool.token1.symbol}
            </Button>
          )}
        </Flex>
        {t0State === ApprovalState.APPROVED ||
        t1State === ApprovalState.APPROVED ? (
          <Flex justifyContent="center">
            <Button onClick={() => doDeposit()}>Deposit</Button>
          </Flex>
        ) : null}
        {balance.gt(0) ? (
          <Flex justifyContent="center">
            <Button onClick={() => doWithdraw()}>Withdraw</Button>
          </Flex>
        ) : null}
      </Container>
      <Flex justifyContent="center" my="1rem">
        <BackLink to="/list">
          Back to all pools
        </BackLink>
      </Flex>
    </Box>
  )
}

export default TidePool
