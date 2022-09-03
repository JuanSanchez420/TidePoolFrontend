import React from "react"
import styled from "styled-components"
import {
  border,
  color,
  BorderProps,
  space,
  SpaceProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  typography,
  TypographyProps,
} from "styled-system"

export const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  ${space}
  ${border}
  ${layout}
`

export const DarkWrapper = styled(Box)`
  background-color: ${(props) => props.theme.colors.darkBlue};
  width: 100%;
`

export interface BoxProps extends SpaceProps, BorderProps, LayoutProps {}
export interface FlexProps extends BoxProps, FlexboxProps {}

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`

export const Wrapper = styled(Flex)`
  font-size: normal;
  color: ${(props) => props.theme.colors.black};
  width: 100%;
  min-height: 100%;
  background-color: ${(props) => props.theme.colors.lightBlue};
  flex-direction: column;
`

export const Button = styled.button`
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.buttonText};
  font-weight: bold;
  text-align: center;
  border-radius: 1rem;
  padding: 5px 15px;
  text-decoration: none;
  background-color: ${(props) => props.theme.colors.yellow};

  :hover {
    background-color: ${(props) => props.theme.colors.darkYellow};
  }
`

export const HollowButton = styled(Button)`
  color: ${(props) => props.theme.colors.buttonText};
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.buttonText};

  :hover {
    background-color: ${(props) => props.theme.colors.darkYellow};
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

const TopWave = styled(Box)`
  background: url("/images/topWave.svg");
  background-position: top left;
  background-repeat: no-repeat;
  background-size: 100%;
`

const BottomWave = styled(Box)`
  background: url("/images/bottomWave.svg");
  background-position: top left;
  background-repeat: no-repeat;
  background-size: 100%;
`

const MiddleWave = styled(Box)`
  background-color: ${(props) => props.theme.colors.darkBlue};
`

export const UnorderedList = styled.ul`
  color: ${props => props.theme.colors.white}
`

export const BlobWrapper = ({
  height,
  children,
}: {
  height: string
  children: React.ReactNode
}) => {
  return (
    <Box>
      <TopWave height={height} />
      <MiddleWave>{children}</MiddleWave>
      <BottomWave height={height} />
    </Box>
  )
}

export const Heading = styled(Text)`
  color: ${(props) => props.theme.colors.babyBlue};
  font-weight: 900;
  font-size: 2rem;
`
