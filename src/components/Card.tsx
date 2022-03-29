import { Box, Flex, Text, Button, External, StyledLink } from "./index"
import { TidePool } from "../info/tidePools"
import styled from "styled-components"
import { imageUrls } from "../info/tokens"

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
    margin: auto;
    border-radius: 0.5rem;
    border: 1px solid ${props => props.theme.colors.border};
    max-width: 500px;
    padding: 5px;
`

export const Info = (props: { tidePool: TidePool }) => {
    return (
        <>
            <Flex borderBottom="1px solid black" pb="10px" alignItems="center" justifyContent="center">
                <IconBox width="35px" height="40px" marginRight="1rem">
                    <IconLeft src={imageUrls[props.tidePool.pool.token0.symbol]}/>
                    <IconRight src={imageUrls[props.tidePool.pool.token1.symbol]}/>
                </IconBox>
                <Text fontWeight="black" fontSize="2rem" textAlign="center">{props.tidePool.pool.token0?.symbol} / {props.tidePool.pool.token1?.symbol}</Text>
            </Flex>
            <Flex flexWrap="wrap">
                <Box width={1/2} p="10px"><Text textAlign="center">200% APR</Text></Box>
                <Box width={1/2} p="10px">
                    <Text textAlign="center"><StyledLink href={`${props.tidePool.chain.blockExplorer}address/${props.tidePool.pool.address}`} target="_blank">View Contract <External/></StyledLink></Text>
                </Box>
            </Flex>
        </>
    )
}

export const Card = (props: { tidePool: TidePool }): JSX.Element => {

    return (
        <Container>
            <Info {...props}/>
            <Box mx="auto"><DepositButton onClick={()=>window.location.href=`/${props.tidePool.chain.name}/${props.tidePool.address}`}>View</DepositButton></Box>
        </Container>
    )
}
