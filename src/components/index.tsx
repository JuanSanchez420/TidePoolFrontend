import React from "react";
import styled from "styled-components";
import {
  border,
  BorderProps,
  space,
  SpaceProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  typography,
  TypographyProps,
} from "styled-system";
import theme from "../info/theme";

export const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  ${space}
  ${border}
  ${layout}
`;
export const Wrapper = styled(Box)`
  font-size: normal;
  color: ${(props) => props.theme.colors.black};
  height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.colors.lightBlue};
`;

export const DarkWrapper = styled(Box)`
  background-color: ${(props) => props.theme.colors.darkBlue};
  width: 100%;
`;

export interface BoxProps extends SpaceProps, BorderProps, LayoutProps {}
export interface FlexProps extends BoxProps, FlexboxProps {}

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`;

export const Button = styled.button`
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.buttonText};
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  border-radius: 0.5rem;
  width: 100%;
  background-color: ${(props) => props.theme.colors.yellow};

  :hover {
    text-decoration: none;
    background-color: ${(props) => props.theme.colors.darkYellow};
  }
`;

export const Text = styled(Box)<TypographyProps>`
  color: ${(props) => props.theme.colors.white};
  ${typography}
`;

export const Select = styled.select<SpaceProps>`
  all: unset;
  cursor: pointer;
  ${space}
`;

export const StyledLink = styled.a`
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    text-decoration: underline;
  }
`;

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
`;
const Logo = styled.img`
  height: 55px;
`;

export const LoadingLogo = () => {
  return <Logo src="/images/TidePoolsCrab.svg" />;
};

const TopWave = styled(Box)`
  background: url("/images/topWave.svg");
  background-position: top left;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
`;

const BottomWave = styled(Box)`
  background: url("/images/bottomWave.svg");
  background-position: top left;
  background-repeat: no-repeat;
`;

const MiddleWave = styled(Box)`
  background-color: ${(props) => props.theme.colors.darkBlue};
`;

export const BlobWrapper = ({
  height,
  children,
}: {
  height: string;
  children: React.ReactNode;
}) => {
  return (
    <Box>
      <TopWave height={height} />
      <MiddleWave>{children}</MiddleWave>
      <BottomWave height={height} />
    </Box>
  );
};

export const Heading = styled(Text)`
  color: ${(props) => props.theme.colors.babyBlue};
  font-weight: 900;
  font-size: 2rem;
`;
