import styled from "styled-components"
import { Flex, Text, Button, Box, FlexProps } from "./index"
import { imageUrls } from "../info/tokens"
import { ethers, BigNumber } from "ethers"
import { Token } from "@uniswap/sdk-core"
import theme from "../info/theme"

const InputBox = styled.input`
  all: unset;
  cursor: pointer;
  width: 100%;
  color: ${(props) => props.theme.colors.white};
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
`

const Icon = styled.img`
  height: 25px;
  margin-right: 10px;
`

export interface WrapperProps extends FlexProps {
  color?: string
}

const Wrapper = styled(Flex)<WrapperProps>`
  border-radius: 1rem;
  background-color: ${({ theme, color = theme.colors.darkBlue }) => color};
  padding: 3px 13px;
`

interface TokenInputProps {
  token?: Token
  balance?: BigNumber
  value?: BigNumber
  setValue?: (e: BigNumber) => void
  color?: string
}

export const TokenInput = ({
  token,
  balance = BigNumber.from(0),
  value = BigNumber.from(0),
  setValue = () => null,
  color = theme.colors.darkishBlue,
}: TokenInputProps): JSX.Element => {
  const significantDigits = (v: string): string => {
    return v.substring(0, v.indexOf(".") + 6)
  }

  return (
    <Wrapper p="10px" alignItems="center" color={color}>
      <Icon src={token?.symbol ? imageUrls[token.symbol] : ""} />
      <Text color="white">{token?.symbol}</Text>
      <InputBox
        value={ethers.utils.formatUnits(value, token?.decimals)}
        onChange={(e) =>
          setValue(ethers.utils.parseUnits(e.target.value, token?.decimals))
        }
        placeholder="0.0"
      />
      <Flex flexDirection="column">
        <Button onClick={() => setValue(balance)}>MAX</Button>
        <Text fontSize="0.75rem" color="white">
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
      <InputBox
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      {icon}
    </Wrapper>
  )
}

export const TextInputWithClear = ({
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
      <Box width="7rem">
        <Button onClick={() => setValue("")}>Clear</Button>
      </Box>
    </Wrapper>
  )
}
