import { AnchorHTMLAttributes } from "react";
import styled from "styled-components"
import { border, BorderProps, 
  space, SpaceProps, 
  flexbox, FlexboxProps,
  layout, LayoutProps, 
  typography, TypographyProps } from "styled-system"
import { Link } from "react-router-dom"

export const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  ${space}
  ${border}
  ${layout}
`
export const Wrapper = styled(Box)`
  font-size: normal;
  color: ${props => props.theme.colors.black};
  height: 100vh;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
`

export interface BoxProps extends SpaceProps, BorderProps, LayoutProps {}
export interface FlexProps extends BoxProps, FlexboxProps {}

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`

export interface Openable { open: boolean }

export const OpenableFlex = styled(Flex)<Openable>``

export const Button = styled.button`
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.lightBlue};
  color:  ${props => props.theme.colors.black};
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  border-radius: 0.5rem;
  width: 100%;
  background-color: ${props=>props.theme.colors.lightBlue};

  :hover {
     text-decoration: none;
     color: white;
     background-color: ${props=>props.theme.colors.darkBlue};
  }
`

export const Text = styled(Box)<TypographyProps>`
  ${typography}
`

export const Select = styled.select<SpaceProps>`
  all: unset;
  cursor: pointer;
  ${space}
`
export const Input = styled.input`
  all: unset;
  cursor: pointer;
  background-color: ${props => props.theme.colors.lightBlue};
  border-radius: 0.5rem;
  width: 100%;
  padding: 10px;
  color: black;
  display: inline-block;
  box-sizing: border-box;
`

export const StyledLink = styled(Link)`
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    text-decoration: underline;
  }
`

export const Cog = () => {
  return (
    <svg fill="currentColor" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"/></svg>
  )
}


export const getIconURL = (chain: string, address: string | undefined) => {
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chain.toLowerCase()}/assets/${address}/logo.png`
}

export const External = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1rem" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

export const LeftArrow = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1rem" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  )
}