import { useContext } from "react"
import styled from "styled-components"
import { Flex, Button, Box } from "./index"
import { networks, Network } from "../info/networks"
import useWeb3Modal from "../hooks/useWeb3Modal"
import { Global } from "../context/GlobalContext"

const Connect = styled(Button)`
    border-radius: 0.5rem;
    padding: 5px 15px;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-transform: none;
`
const Logo = styled.img`
    height:1rem;
    margin-right: 2px;
`

const TidePoolLogo = styled.img`
    height: 3rem;
`

const NetworkSelect = styled(Flex)`
    padding: 5px 10px;
    align-items: center;
    border: 1px solid ${props => props.theme.colors.black};
    border-radius: 0.5rem;
    padding-left: 0.5rem;
    position: relative;
    width: 7rem;
    justify-content:center;
    cursor: pointer;

    :hover #wut {
        display: block;
        width:150px;
    }
`

const NetworkSelectOptions = styled(Flex)`
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.5rem;
    padding: 5px;
    background-color: white;
    border-radius: 1rem;
    border: 1px solid black;
    
`

export const Header = () => {
    const { account, network } = useContext(Global)
    const web3 = useWeb3Modal()

    return (
        <Flex p="1rem" alignItems="center">
            <Flex flex="1 1 auto">
                <a href="/"><TidePoolLogo src="/images/LogoWithTaglineHorizontal.png"/></a>
            </Flex>
            <Flex alignItems="center">
                <NetworkSelect>
                    <Flex alignItems="center"><Logo src={network.image}/>{network.name}</Flex>
                    <NetworkSelectOptions id="wut" flexDirection="column">
                        <Box>Select a Network</Box>
                        {networks.map((n: Network)=><Flex key={n.chainId} alignItems="center" p="2px" onClick={()=>web3.switchChains(n.chainId)}><Logo src={n.image}/>{n.name}</Flex>)}
                    </NetworkSelectOptions>
                </NetworkSelect>
                <Connect onClick={()=>web3.connect()}>{!account ? "Connect" : account}</Connect>
            </Flex>
        </Flex>
    )
}