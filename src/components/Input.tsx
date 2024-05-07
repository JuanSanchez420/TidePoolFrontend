import styled from "styled-components"
import { Flex, Text, Button, Box, FlexProps } from "./index"
import { imageUrls } from "../info/tokens"
import { Token } from "@uniswap/sdk-core"
import theme from "../info/theme"
import { formatUnits } from "viem"
import { KeyboardEvent } from "react"

const InputBox = styled.input`
  all: unset;
  cursor: pointer;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  display: inline-block;
  box-sizing: border-box;
  text-align: center;

  ::placeholder {
    font-style: italic;
  }
`

const Icon = styled.img`
  height: 25px;
  margin-right: 5px;
`

export interface WrapperProps extends FlexProps {
  color?: string
}

const Wrapper = styled(Flex)<WrapperProps>`
  border-radius: 1rem;
  background-color: ${({ theme, color = theme.colors.darkBlue }) => color};
  padding: 3 13px;
`

const MaxButton = styled(Button)`
  font-size: 1rem;
  padding: 3px 10px;
`

const escapeRegExp = (val: string) => {
  return val.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") // $& means the whole matched string
}

const parseValue = (val: string | number) => {
  const valAsString = val?.toString() ?? ""

  let valWithCommas
  if (valAsString.includes(".")) {
    const valInParts = valAsString.split(".")
    valWithCommas = `${valInParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${
      valInParts[1]
    }`
  } else if (valAsString) {
    valWithCommas = valAsString.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  return valWithCommas
}

const numbersOnly = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (!/^\d*\.?\d*$/.test(event.key)) {
    event.preventDefault()
  }
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

interface TokenInputProps {
  token?: Token
  balance?: bigint
  value?: string
  setValue?: (e: string) => void
  color?: string
}

export const TokenInput = ({
  token,
  balance = 0n,
  value = "",
  setValue = () => null,
  color = theme.colors.darkishBlue,
}: TokenInputProps): JSX.Element => {
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === "" || inputRegex.test(escapeRegExp(nextUserInput))) {
      setValue(nextUserInput)
    }
  }

  return (
    <Wrapper p="10px" alignItems="center" color={color}>
      <Icon src={token?.symbol ? imageUrls[token.symbol] : ""} />
      <Text color="white">{token?.symbol}</Text>
      <InputBox
        value={parseValue(value.toString())}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => numbersOnly(e)}
        onChange={(e: { target: { value: string } }) =>
          enforcer(e.target.value.replace(/,/g, ""))
        }
        placeholder="0.0"
      />

      <MaxButton
        onClick={() => setValue(formatUnits(balance, token?.decimals || 18))}
      >
        MAX
      </MaxButton>
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
        onChange={(e: { target: { value: string } }) =>
          setValue(e.target.value)
        }
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
        onChange={(e: { target: { value: string } }) =>
          setValue(e.target.value)
        }
        placeholder={placeholder}
      />
      <Box width="7rem">
        <Button onClick={() => setValue("")}>Clear</Button>
      </Box>
    </Wrapper>
  )
}
