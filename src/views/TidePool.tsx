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
    checked: boolean
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

    const blank = {token0Approved: false, token1Approved: false, checked: false}

    const tidePool = ensure(tidePools.find(p=>p.chain.name === networkName && p.address === address))
    const [isApproved, setIsApproved] = useState<Approvals>(blank)

    const g = useContext(Global)

    const token0Contract = useTokenContract(tidePool.pool.token0.address)
    const token1Contract = useTokenContract(tidePool.pool.token1.address)
    const tp = useTidePoolContract(tidePool.address)

    const [zero, setZero] = useState<string | undefined>()
    const [one, setOne] = useState<string | undefined>()

    useEffect(()=>{
        const getBalances = async () => {
            const z = await token0Contract.balanceOf(await g!.signer!.getAddress())
            const o = await token1Contract.balanceOf(await g!.signer!.getAddress())
            console.log(`balances: z: ${z}, o: ${o}`)
            setZero(z)
            setOne(o)
        }
        if(zero === undefined && one === undefined && token0Contract && token1Contract && g?.signer) {
            getBalances()
        }
    },[token0Contract, token1Contract, g?.signer])

    useEffect(()=>{
        const check = async() => {
            console.log("checking approvals")
            const a = await g!.signer!.getAddress()
            console.log(`Owner: ${a}, Spender: ${tidePool.address}`)
            token0Contract.connect(g!.signer!)
            token1Contract.connect(g!.signer!)
            const zero = await token0Contract.allowance(a, tidePool.address)
            const one = await token1Contract.allowance(a, tidePool.address)
            console.log(`USDC: ${zero}, WETH: ${one}`)
            setIsApproved({token0Approved: zero > BigNumber.from(0), token1Approved: one > BigNumber.from(0), checked: true})
        }

        if(!isApproved.checked && g && g.signer) check()
    },[isApproved, g, g?.signer, tidePool?.address, token0Contract, token1Contract])

    const approve = async (z: number) => {
        
        if(z === 0) {
            token0Contract.connect(g!.signer!)
            await token0Contract.approve(tidePool.address, MAX_UINT256)
        } else {
            token1Contract.connect(g!.signer!)
            await token1Contract.approve(tidePool.address, MAX_UINT256)
        }
        setIsApproved(blank)
    }

    const deposit = async () => {
        
        tp.connect(g!.signer!)
        await tp.deposit(zero, one)
    }

    return (
        <Box>
            <StyledLink to="/">
                <LeftArrow/> Return to list
            </StyledLink>
            <Container>
                <Info tidePool={tidePool}/>
                <Box mx="auto">
                    {isApproved.token0Approved ? <EthAmount value={zero} onChange={(e)=>setZero(e.target.value)} placeholder={tidePool.pool.token0?.symbol}/> :
                    <StyledButton disabled={!g?.signer} onClick={()=>approve(0)}>Approve {tidePool.pool.token0.symbol}</StyledButton>}
                </Box>
                <Box mx="auto">
                    {isApproved.token1Approved ? <EthAmount value={one} onChange={(e)=>setOne(e.target.value)}  placeholder={tidePool.pool.token1?.symbol}/> :
                    <StyledButton disabled={!g?.signer} onClick={()=>approve(1)}>Approve {tidePool.pool.token1.symbol}</StyledButton>}
                </Box>
                {isApproved.token1Approved && isApproved.token0Approved ? <Box mx="auto"><StyledButton onClick={()=>deposit()}>Deposit</StyledButton></Box> : null}
            </Container>
        </Box>
    )
}

export default TidePool