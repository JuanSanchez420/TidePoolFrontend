import { useState, useContext } from "react"
import { Box, Flex, Text, Button, StyledLink } from "./index"
import { Chevron, External } from "./Icons"
import styled from "styled-components"
import { imageUrls } from "../info/tokens"
import { TidePool } from "../info/types"
import { Global } from "../context/GlobalContext"

const DepositButton = styled(Button)`
    padding: 10px;
`

const IconBox = styled(Box)`
    position: relative;
`

const IconLeft = styled.img`
    height: 25px;
    position:absolute;
    top:0;
    left:0;
    z-index: 1;
`

const IconRight = styled.img`
    height: 25px;
    position: absolute;
    bottom:0;
    right:0;
    z-index: 2;
`

export const Container = styled(Box)`
    border-radius: 0.5rem;
    padding: 10px; 
    background-color: ${props => props.theme.colors.white};
    filter: ${props => props.theme.utils.dropShadow};
`

export const Info = (props: { tidePool: TidePool }) => {
    const { network } = useContext(Global)
    const [open, setOpen] = useState(false)

    return (
        <>
            <Flex pb="10px" alignItems="center" justifyContent="space-around">
                <Flex>
                <IconBox width="35px" height="40px" marginRight="1rem">
                    <IconLeft src={imageUrls[props.tidePool.pool.token0.symbol]}/>
                    <IconRight src={imageUrls[props.tidePool.pool.token1.symbol]}/>
                </IconBox>
                <Text fontWeight="black" fontSize="1.5rem" textAlign="center">{props.tidePool.pool.token0?.symbol} / {props.tidePool.pool.token1?.symbol}</Text>
                </Flex>
            </Flex>
            <Flex flexWrap="wrap" p="10px" justifyContent="space-around">
                <Text textAlign="center">200% APR</Text>
                <StyledLink onClick={()=>setOpen(!open)}><Flex>Details<Box width="10px" ml="5px"><Chevron open={open}/></Box></Flex></StyledLink>
            </Flex>
            {open && 
                <Flex>
                    <Flex flexDirection="column">
                        <Box borderBottom="1px solid black"><Text textAlign="center">Contracts</Text></Box>
                        <StyledLink href={`${network.blockExplorer}address/${props.tidePool.pool.address}`} target="_blank">Uniswap pool <External height="1rem" width="1rem"/></StyledLink>
                        <StyledLink href={`${network.blockExplorer}address/${props.tidePool.address}`} target="_blank">TidePool <External height="1rem" width="1rem"/></StyledLink>
                        <StyledLink href={`${network.blockExplorer}address/${props.tidePool.pool.token0.address}`} target="_blank">{props.tidePool.pool.token0.symbol} <External height="1rem" width="1rem"/></StyledLink>
                        <StyledLink href={`${network.blockExplorer}address/${props.tidePool.pool.token1.address}`} target="_blank">{props.tidePool.pool.token1.symbol} <External height="1rem" width="1rem"/></StyledLink>
                    </Flex>
                </Flex>
            }
        </>
    )
}

export const Card = (props: { tidePool: TidePool }): JSX.Element => {
    const { network } = useContext(Global)

    return (
        <Container mb={["2rem"]} mx="auto" maxWidth="400px" width="100%" p="5px">
            <Info {...props}/>
            <Box mx="auto"><DepositButton onClick={()=>window.location.href=`/${network.name}/${props.tidePool.address}`}>Enter Pool</DepositButton></Box>
        </Container>
    )
}
