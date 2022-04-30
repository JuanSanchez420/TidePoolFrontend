import { useState, useEffect, useContext, useRef } from "react"
import { useParams } from "react-router-dom"
import { Box, StyledLink, Button } from "../components/index"
import { LeftArrow } from "../components/Icons"
import { ensure } from "../info/pools"
import { tidePools } from "../info/tidePools"
import { Container, Info } from "../components/Card"
import { useTidePoolContract, useTokenContract } from "../hooks/useContract"
import { BigNumber } from "ethers"
import { Global } from "../context/GlobalContext"
import styled from "styled-components"
import { MAX_UINT256 } from "../info/constants"
import { TokenInput } from "../components/Input"

interface Approvals {
    token0Approved: boolean | null
    token1Approved: boolean | null
    checkedBalances: boolean
}

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
    const networkName = useParams().network

    const blank = {token0Approved: null, token1Approved: null, checkedBalances: false}

    const tidePool = ensure(tidePools.find(p=>p.chain.name === networkName && p.address === address))
    const [isApproved, setIsApproved] = useState<Approvals>(blank)

    const { account, provider } = useContext(Global)

    const token0Contract = useTokenContract(tidePool.pool.token0.address)
    const token1Contract = useTokenContract(tidePool.pool.token1.address)
    const tp = useTidePoolContract(tidePool.address)

    const [zero, setZero] = useState<BigNumber>(BigNumber.from(0))
    const [one, setOne] = useState<BigNumber>(BigNumber.from(0))

    const [zeroIn, setZeroIn] = useState<BigNumber>(BigNumber.from(0))
    const [oneIn, setOneIn] = useState<BigNumber>(BigNumber.from(0))

    const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))

    const checkedApprovals = useRef(false)

    useEffect(()=>{
        const getBalances = async () => {
            const z = await token0Contract.balanceOf(account)
            const o = await token1Contract.balanceOf(account)
            const b = await tp.balanceOf(account)
            
            setZero(z)
            setOne(o)
            setBalance(b)
            setIsApproved({...isApproved, checkedBalances: true})
        }
        if(account && !isApproved.checkedBalances && zero === undefined && one === undefined && token0Contract && token1Contract) {
            getBalances()
        }
    },[account, isApproved, token0Contract, token1Contract, tp, provider, one, zero])

    useEffect(()=>{
        const check = async() => {
            
            checkedApprovals.current = true
            const zero = await token0Contract.allowance(account, tidePool.address)
            const one = await token1Contract.allowance(account, tidePool.address)

            setIsApproved({token0Approved: zero > BigNumber.from(0), token1Approved: one > BigNumber.from(0), checkedBalances: false})
        }

        if(!checkedApprovals.current && account) check()
    },[account, isApproved, tidePool?.address, token0Contract, token1Contract])

    const approve = async (z: number) => {
        try {
            if(z === 0) {
                await token0Contract.approve(tidePool.address, MAX_UINT256)
            } else {
                await token1Contract.approve(tidePool.address, MAX_UINT256)
            }
            setIsApproved(blank)
        } catch(e) {
            console.log(e)
            setError(e)
        }
    }

    const deposit = async () => {
        try{
            await tp.deposit(zeroIn, oneIn)
        } catch(e) {
            console.log(e)
            setError(e)
        }
    }

    const withdraw = async () => {
        try {
            await tp.withdraw()
        } catch(e) {
            console.log(e)
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
                    {!checkedApprovals.current ? <StyledButton disabled>Checking...</StyledButton> 
                    : isApproved.token0Approved ? <EthAmount token={tidePool.pool.token0} balance={zero} value={zeroIn} setValue={setZeroIn}/> 
                    : <StyledButton disabled={!account} onClick={()=>approve(0)}>Approve {tidePool.pool.token0.symbol}</StyledButton>}
                </Box>
                <Box mx="auto">
                    {!checkedApprovals.current ? <StyledButton disabled>Checking...</StyledButton>
                    : isApproved.token1Approved ? <EthAmount token={tidePool.pool.token1} balance={zero} value={oneIn} setValue={setOneIn}/>
                    : <StyledButton disabled={!account} onClick={()=>approve(1)}>Approve {tidePool.pool.token1.symbol}</StyledButton>}
                </Box>
                {isApproved.token1Approved && isApproved.token0Approved ? <Box mx="auto"><StyledButton onClick={()=>deposit()}>Deposit</StyledButton></Box> : null}
                {balance.gt(0) ? <Box mx="auto"><StyledButton onClick={()=>withdraw()}>Withdraw</StyledButton></Box> : null}
            </Container>
            <Console error={error}/>
        </Box>
    )
}

export default TidePool