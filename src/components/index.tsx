import styled from "styled-components"
import { border, BorderProps, 
  space, SpaceProps, 
  flexbox, FlexboxProps,
  layout, LayoutProps, 
  typography, TypographyProps } from "styled-system"

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
  padding:5px;
  background-color: ${props => props.theme.colors.lightBlue};
  background-image: linear-gradient(210deg, ${props => props.theme.colors.darkBlue} 0%, ${props => props.theme.colors.lightBlue} 50%, ${props => props.theme.colors.white} 100%);
`

export interface BoxProps extends SpaceProps, BorderProps, LayoutProps {}
export interface FlexProps extends BoxProps, FlexboxProps {}

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`

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

export const StyledLink = styled.a`
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    text-decoration: underline;
  }
`

