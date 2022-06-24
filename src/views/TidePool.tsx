import { useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { Box, Button } from "../components/index"
import { Container, Info } from "../components/Card"
import { BigNumber } from "ethers"
import { Global } from "../context/GlobalContext"
import styled from "styled-components"
import { TokenInput } from "../components/Input"
import useToken from "../hooks/useToken"
import useTidePool from "../hooks/useTidePool"
import { ApprovalState } from "../info/types"
import usePool from "../hooks/usePool"

const EthAmount = styled(TokenInput)`
    text-align:center;
    margin-bottom: 0.5rem;
`
const StyledButton = styled(Button)`
    padding: 10px;
    margin-bottom: 0.5rem;
`

const Console = ({error}: any) => {
    return (
        <Box>{error?.data ? error.data : null}</Box>
    )
}

const TidePool = () => {
    const [error, setError] = useState<any>("")
    const address = useParams().address

    const { account, theList } = useContext(Global)

    const tidePool = theList.tidePools.find(p=>p.address === address)

    const { state: t0State, balance: t0Balance, approve: approveT0 } = useToken(tidePool?.pool.token0.address, account, tidePool?.address)
    const { state: t1State, balance: t1Balance, approve: approveT1 } = useToken(tidePool?.pool.token1.address, account, tidePool?.address)

    const { deposit, withdraw, balance } = useTidePool(tidePool?.address, account)
    const { slot0 } = usePool(tidePool?.pool.address)

    const [zeroIn, setZeroIn] = useState<BigNumber>(BigNumber.from(0))
    const [oneIn, setOneIn] = useState<BigNumber>(BigNumber.from(0))

    const doDeposit = async () => {
        try{
            await deposit(zeroIn, oneIn)
        } catch(e) {
            setError(e)
        }
    }

    const doWithdraw = async () => {
        try {
            await withdraw()
        } catch(e) {
            setError(e)
        }
    }

    return (
        <Box>
            <Box maxWidth="400px" width="100%" mx="auto" py="rem" mb="1rem">
                <StyledButton onClick={()=>window.location.href="/"}>Back to all pools</StyledButton>
            </Box>
            <Container maxWidth="400px" width="100%" mx="auto">
                <Info tidePool={tidePool} slot0={slot0}/>
                <Box mx="auto">
                    { t0State === ApprovalState.APPROVED ? <EthAmount token={tidePool?.pool.token0} balance={t0Balance} value={zeroIn} setValue={setZeroIn}/> 
                    : <StyledButton disabled={!account} onClick={()=>approveT0()}>Approve {tidePool?.pool.token0.symbol}</StyledButton>}
                </Box>
                <Box mx="auto">
                    { t1State === ApprovalState.APPROVED ? <EthAmount token={tidePool?.pool.token1} balance={t1Balance} value={oneIn} setValue={setOneIn}/>
                    : <StyledButton disabled={!account} onClick={()=>approveT1()}>Approve {tidePool?.pool.token1.symbol}</StyledButton>}
                </Box>
                {t0State === ApprovalState.APPROVED || t1State === ApprovalState.APPROVED ? <Box mx="auto"><StyledButton onClick={()=>doDeposit()}>Deposit</StyledButton></Box> : null}
                {balance.gt(0) ? <Box mx="auto"><StyledButton onClick={()=>doWithdraw()}>Withdraw</StyledButton></Box> : null}
            </Container>
            <Console error={error}/>
        </Box>
    )
}

export default TidePool