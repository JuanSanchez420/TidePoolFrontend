export const breakpointMap: { [key: string]: number } = {
  xs: 370,
  sm: 576,
  md: 852,
  lg: 968,
  xl: 1080,
  xxl: 1200,
}

// const breakpoints = Object.values(breakpointMap).map((breakpoint) => `${breakpoint}px`);

const mediaQueries = {
  xs: `@media screen and (min-width: ${breakpointMap.xs}px)`,
  sm: `@media screen and (min-width: ${breakpointMap.sm}px)`,
  md: `@media screen and (min-width: ${breakpointMap.md}px)`,
  lg: `@media screen and (min-width: ${breakpointMap.lg}px)`,
  xl: `@media screen and (min-width: ${breakpointMap.xl}px)`,
  xxl: `@media screen and (min-width: ${breakpointMap.xxl}px)`,
  nav: `@media screen and (min-width: ${breakpointMap.lg}px)`,
}

const colors: { [key: string]: string } = {
  black: "#000000",
  darkBlue: "#072E4F",
  darkishBlue: "#0B3E69",
  lightBlue: "#033E6B",
  lighterBlue: "#155C9A",
  babyBlue: "#BDE9FF",
  buttonText: "#055C9D",
  red: "#da1f3d",
  white: "#FFFFFF",
  yellow: "#FFD51E",
  darkYellow: "#B89A17",
  overlay: "#452a7a"
}

const utils: { [key: string]: string } = {
  dropShadow:
    "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
}

const zIndices = { modal: 100 }

const theme = { mediaQueries, colors, utils, zIndices }

export default theme
