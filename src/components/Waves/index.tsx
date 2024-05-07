import React from "react"
import styled from "styled-components"
import { Box } from ".."

const TopContainer = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
`

const TopSVG = styled.svg`
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 50px;

  ${({theme}) => theme.mediaQueries.md} {
    height: 75px;
  }
`

const TopPath = styled.path`
  fill: #033e6b;
`

const TopWave = (props: React.SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <TopContainer>
      <TopSVG
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <TopPath
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="shape-fill"
        ></TopPath>
      </TopSVG>
    </TopContainer>
  )
}

const BottomContainer = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
`

const BottomSVG = styled.svg`
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 50px;

  ${({theme}) => theme.mediaQueries.md} {
    height: 75px;
  }
`

const BottomPath = styled.path`
  fill: #033e6b;
`

const BottomWave = (props: React.SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <BottomContainer>
      <BottomSVG
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <BottomPath
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          className="shape-fill"
        ></BottomPath>
      </BottomSVG>
    </BottomContainer>
  )
}

const MiddleWave = styled(Box)`
  background-color: ${({theme}) => theme.colors.darkBlue};
`

const WaveWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ position: "relative" }}>
      <TopWave />
      <MiddleWave py="2rem">{children}</MiddleWave>
      <BottomWave />
    </div>
  )
}

export default WaveWrapper
