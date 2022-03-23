import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Box, LeftArrow, Text, StyledLink } from "../components/index"
import { pools, ensure } from "../info/pools"
import { tidePools } from "../info/tidePools"
import { ActionCard } from "../components/Card"
import useERC20 from "../hooks/useERC20"
import { BigNumber } from "ethers"
import { Global } from "../context/GlobalContext"
import { Token } from "../info/tokens"

interface Approvals {
    token0Approved: boolean
    token1Approved: boolean
    checked: boolean
}

const TidePool = () => {
    const address = useParams().address
    const networkName = useParams().network

    const tidePool = ensure(tidePools.find(p=>p.chain.name === networkName && p.address === address))
    const [isApproved, setIsApproved] = useState<Approvals>({token0Approved: false, token1Approved: false, checked: false})

    const g = useContext(Global)
    
    const token0Contract = useERC20(tidePool.pool.token0)
    const token1Contract = useERC20(tidePool.pool.token1)

    useEffect(()=>{
        const check = async() => {
            const a = await g!.signer!.getAddress()
            const zero = await token0Contract.allowance(a, tidePool.address)
            const one = await token1Contract.allowance(a, tidePool.address)
            
            setIsApproved({token0Approved: zero > BigNumber.from(0), token1Approved: one > BigNumber.from(0), checked: true})
        }

        if(!isApproved.checked && g && g.signer) check()
    },[isApproved, g?.signer])


    return (
        <Box>
            <StyledLink to="/">
                <LeftArrow/> Return to list
            </StyledLink>
            <ActionCard tidePool={tidePool} />
        </Box>
    )
}

export default TidePool