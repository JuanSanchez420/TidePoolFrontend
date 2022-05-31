import { useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { Box, StyledLink, Button } from "../components/index"
import { LeftArrow } from "../components/Icons"
import { Container, Info } from "../components/Card"
import { BigNumber } from "ethers"
import { Global } from "../context/GlobalContext"
import styled from "styled-components"
import { TokenInput } from "../components/Input"
import useToken from "../hooks/useToken"
import useTidePool from "../hooks/useTidePool"
import { dummyTidePool } from "../info/types"

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

    const tidePool = theList.tidePools.find(p=>p.address === address) || dummyTidePool

    const { isApproved: t0Approved, balance: t0Balance, approve: approveT0 } = useToken(tidePool.pool.token0.address, account, tidePool.address)
    const { isApproved: t1Approved, balance: t1Balance, approve: approveT1 } = useToken(tidePool.pool.token1.address, account, tidePool.address)

    const { deposit, withdraw, balance } = useTidePool(tidePool.address, account)

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
            <StyledLink href="/">
                <LeftArrow height="1rem" width="1rem"/> Return to list
            </StyledLink>
            <Container>
                <Info tidePool={tidePool}/>
                <Box mx="auto">
                    { t0Approved ? <EthAmount token={tidePool.pool.token0} balance={t0Balance} value={zeroIn} setValue={setZeroIn}/> 
                    : <StyledButton disabled={!account} onClick={()=>approveT0()}>Approve {tidePool.pool.token0.symbol}</StyledButton>}
                </Box>
                <Box mx="auto">
                    { t1Approved ? <EthAmount token={tidePool.pool.token1} balance={t1Balance} value={oneIn} setValue={setOneIn}/>
                    : <StyledButton disabled={!account} onClick={()=>approveT1()}>Approve {tidePool.pool.token1.symbol}</StyledButton>}
                </Box>
                {t0Approved || t1Approved ? <Box mx="auto"><StyledButton onClick={()=>doDeposit()}>Deposit</StyledButton></Box> : null}
                {balance.gt(0) ? <Box mx="auto"><StyledButton onClick={()=>doWithdraw()}>Withdraw</StyledButton></Box> : null}
            </Container>
            <Console error={error}/>
        </Box>
    )
}

export default TidePool