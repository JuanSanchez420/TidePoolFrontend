import React from "react"
import styled from "styled-components"
import {
  border,
  color,
  BorderProps,
  space,
  SpaceProps,
  flexbox,
  grid,
  FlexboxProps,
  layout,
  LayoutProps,
  typography,
  TypographyProps,
  GridProps as _GridProps,
} from "styled-system"

export const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  ${space}
  ${border}
  ${layout}
`

export const DarkWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.colors.darkBlue};
  width: 100%;
`

export interface BoxProps extends SpaceProps, BorderProps, LayoutProps {}
export interface FlexProps extends BoxProps, FlexboxProps {}
export interface GridProps extends FlexProps, _GridProps {}

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`

export const Grid = styled(Box)<GridProps>`
  display: grid;
  ${flexbox}
  ${grid}
`

export const Wrapper = styled(Flex)`
  font-size: normal;
  color: ${({ theme }) => theme.colors.black};
  width: 100%;
  min-height: 100%;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Button = styled.button`
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.buttonText};
  font-weight: bold;
  text-align: center;
  border-radius: 1rem;
  padding: 5px 15px;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.yellow};

  :hover {
    background-color: ${({ theme }) => theme.colors.darkYellow};
  }

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Connect = styled(Button)`
    border-radius: 1rem;
    padding: 5px 15px;
    background-color: ${({ theme }) => theme.colors.yellow}

    :hover {
        background-color: ${({ theme }) => theme.colors.darkYellow}
    }

    ${({ theme }) => theme.mediaQueries.sm} {
        width: 7rem;
    };
`

export const HollowButton = styled(Button)`
  color: ${({ theme }) => theme.colors.buttonText};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.buttonText};

  :hover {
    background-color: ${({ theme }) => theme.colors.darkYellow};
  }
`

export const Text = styled(Box)<TypographyProps>`
  ${typography}
  ${color}
`

export const Select = styled.select<SpaceProps>`
  all: unset;
  cursor: pointer;
  ${space}
`

export const Dots = styled(Box)`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: ".";
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: ".";
    }
    33% {
      content: "..";
    }
    66% {
      content: "...";
    }
  }
`
const Logo = styled.img`
  height: 55px;
`

export const LoadingLogo = () => {
  return <Logo src="/images/TidePoolsCrab.svg" />
}

export const UnorderedList = styled.ul`
  color: ${({ theme }) => theme.colors.white};
`

export const OrderedList = styled.ol`
  color: ${({ theme }) => theme.colors.white};
`

export const Heading = styled(Text)`
  color: ${({ theme }) => theme.colors.babyBlue};
  font-weight: 900;
  font-size: 1.5rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 2rem;
  }};
`
