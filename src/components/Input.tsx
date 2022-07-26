import React from "react"
import styled from "styled-components"
import { Flex, Text, Button } from "./index"
import { imageUrls } from "../info/tokens"
import { ethers, BigNumber } from "ethers"
import { Token } from "../info/types"

const InputBox = styled.input`
  all: unset;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.lightBlue};
  border-radius: 0.5rem;
  width: 100%;
  padding: 10px;
  color: black;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
`

const Icon = styled.img`
  height: 25px;
  margin-right: 10px;
`

const Wrapper = styled(Flex)`
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  margin-bottom: 1rem;
`

const MaxButton = styled(Button)`
  width: 4rem;
  padding: 5px;
`

interface TokenInputProps {
  token?: Token
  balance: BigNumber
  value: BigNumber
  setValue: (e: BigNumber) => void
}

export const TokenInput = ({
  token,
  balance = BigNumber.from(0),
  value = BigNumber.from(0),
  setValue = () => null,
}: TokenInputProps): JSX.Element => {
  const significantDigits = (v: string): string => {
    return v.substring(0, v.indexOf(".") + 6)
  }

  return (
    <Wrapper p="10px" alignItems="center">
      <Icon src={token ? imageUrls[token.symbol] : ""} />
      <Text>{token?.symbol}</Text>
      <InputBox
        value={ethers.utils.formatUnits(value, token?.decimals)}
        onChange={(e) =>
          setValue(ethers.utils.parseUnits(e.target.value, token?.decimals))
        }
        placeholder="0.0"
      />
      <Flex flexDirection="column">
        <MaxButton onClick={() => setValue(balance)}>MAX</MaxButton>
        <Text fontSize="0.75rem">
          Balance:{" "}
          {significantDigits(
            ethers.utils.formatUnits(balance, token?.decimals)
          )}
        </Text>
      </Flex>
    </Wrapper>
  )
}

interface TextInputProps {
  value: string
  setValue: (e: string) => void
  placeholder?: string
  icon?: JSX.Element | null
}

export const TextInput = ({
  value = "",
  setValue = () => null,
  placeholder = "",
  icon = null,
}: TextInputProps): JSX.Element => {
  return (
    <Wrapper p="5px" alignItems="center">
      {icon}
      <InputBox
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <MaxButton onClick={() => setValue("")}>Clear</MaxButton>
    </Wrapper>
  )
}
