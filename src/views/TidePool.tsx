import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Box, LeftArrow, StyledLink, Input, Button } from "../components/index"
import { ensure } from "../info/pools"
import { tidePools } from "../info/tidePools"
import { Container, Info } from "../components/Card"
import { useTidePoolContract, useTokenContract } from "../hooks/useContract"
import { BigNumber } from "ethers"
import { Global } from "../context/GlobalContext"
import styled from "styled-components"
import { MAX_UINT256 } from "../info/constants"

interface Approvals {
    token0Approved: boolean
    token1Approved: boolean
    checkedApprovals: boolean
    checkedBalances: boolean
}

const EthAmount = styled(Input)`
    text-align:center;
    margin-bottom: 0.5rem;
`
const StyledButton = styled(Button)`
    padding: 10px;
    margin-bottom: 0.5rem;
`

const TidePool = () => {
    const address = useParams().address
    const networkName = useParams().network

    const blank = {token0Approved: false, token1Approved: false, checkedApprovals: false, checkedBalances: false}

    const tidePool = ensure(tidePools.find(p=>p.chain.name === networkName && p.address === address))
    const [isApproved, setIsApproved] = useState<Approvals>(blank)

    const { account, provider }= useContext(Global)

    const token0Contract = useTokenContract(tidePool.pool.token0.address)
    const token1Contract = useTokenContract(tidePool.pool.token1.address)
    const tp = useTidePoolContract(tidePool.address)

    const [zero, setZero] = useState<string | undefined>()
    const [one, setOne] = useState<string | undefined>()

    useEffect(()=>{
        const getBalances = async () => {
            const z = await token0Contract.balanceOf(account)
            const o = await token1Contract.balanceOf(account)
            console.log(`balances: z: ${z}, o: ${o}`)
            setZero(z)
            setOne(o)
            setIsApproved({...isApproved, checkedBalances: true})
        }
        if(account && !isApproved.checkedBalances && isApproved.checkedApprovals && zero === undefined && one === undefined && token0Contract && token1Contract) {
            getBalances()
        }
    },[account, isApproved, token0Contract, token1Contract, provider])

    useEffect(()=>{
        const check = async() => {

            const zero = await token0Contract.allowance(account, tidePool.address)
            const one = await token1Contract.allowance(account, tidePool.address)

            setIsApproved({token0Approved: zero > BigNumber.from(0), token1Approved: one > BigNumber.from(0), checkedApprovals: true, checkedBalances: false})
        }

        if(!isApproved.checkedApprovals && account) check()
    },[account, isApproved, provider, tidePool?.address, token0Contract, token1Contract])

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
        }
    }

    const deposit = async () => {
        try{ 
            await tp.deposit(zero, one)
        } catch(e) {
            console.log(e)
        }
    }

    const withdraw = async () => {
        try {
            await tp.withdraw()
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <Box>
            <StyledLink to="/">
                <LeftArrow/> Return to list
            </StyledLink>
            <Container>
                <Info tidePool={tidePool}/>
                <Box mx="auto">
                    {!isApproved.checkedApprovals ? <div>Checking...</div> : isApproved.token0Approved ? <EthAmount value={zero} onChange={(e)=>setZero(e.target.value)} placeholder={tidePool.pool.token0.symbol}/> :
                    <StyledButton disabled={!account} onClick={()=>approve(0)}>Approve {tidePool.pool.token0.symbol}</StyledButton>}
                </Box>
                <Box mx="auto">
                    {!isApproved.checkedApprovals ? <div>Checking...</div> : isApproved.token1Approved ? <EthAmount value={one} onChange={(e)=>setOne(e.target.value)}  placeholder={tidePool.pool.token1.symbol}/> :
                    <StyledButton disabled={!account} onClick={()=>approve(1)}>Approve {tidePool.pool.token1.symbol}</StyledButton>}
                </Box>
                {isApproved.token1Approved && isApproved.token0Approved ? <Box mx="auto"><StyledButton onClick={()=>deposit()}>Deposit</StyledButton></Box> : null}
            </Container>
        </Box>
    )
}

export default TidePool