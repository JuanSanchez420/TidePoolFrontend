import React, { useState, useMemo } from "react"
import styled from "styled-components"
import { Box, Flex, Text, Button } from "./index"
import { imageUrls, Token } from "../info/tokens"
import { ethers, BigNumber } from "ethers"

const InputBox = styled.input`
    all: unset;
    cursor: pointer;
    background-color: ${props => props.theme.colors.lightBlue};
    border-radius: 0.5rem;
    width: 100%;
    padding: 10px;
    color: black;
    display: inline-block;
    box-sizing: border-box;
    text-align:center;
`

const Icon = styled.img`
    height:25px;
    margin-right: 10px;
`

const Wrapper = styled(Flex)`
    border-radius: 0.5rem;
    background-color: ${({theme})=>theme.colors.lightBlue};
    margin-bottom: 1rem;
`

const MaxButton = styled(Button)`
    width: 4rem;
    padding: 5px;
`

interface InputProps {
    token: Token
    balance: string
    value: string
    setValue: (e: string) => void
}

const Input = ({ token, balance, value = "", setValue = ()=>null }: InputProps): JSX.Element => {

    const formattedBalance = useMemo(()=>{
        if(!balance && !token) return "0.0"
        const bn = BigNumber.from(balance)
        return ethers.utils.formatUnits(bn, token.decimals)
    },[balance, token])

    return (
        <Wrapper p="10px" alignItems="center">
            <Icon src={imageUrls[token.symbol]}/>
            <Text>{token.symbol}</Text>
            <InputBox value={value} onChange={(e)=>setValue(e.target.value)} placeholder="0.0"/>
            <Flex flexDirection="column">
                <MaxButton onClick={()=>setValue(formattedBalance)}>MAX</MaxButton>
                <Text fontSize="0.75rem">Balance: {formattedBalance}</Text>
            </Flex>
        </Wrapper>
    )
}

export default Input