
export const breakpointMap: { [key: string]: number } = {
    xs: 370,
    sm: 576,
    md: 852,
    lg: 968,
    xl: 1080,
    xxl: 1200,
  };
  
const breakpoints = Object.values(breakpointMap).map((breakpoint) => `${breakpoint}px`);

const mediaQueries = {
xs: `@media screen and (min-width: ${breakpointMap.xs}px)`,
sm: `@media screen and (min-width: ${breakpointMap.sm}px)`,
md: `@media screen and (min-width: ${breakpointMap.md}px)`,
lg: `@media screen and (min-width: ${breakpointMap.lg}px)`,
xl: `@media screen and (min-width: ${breakpointMap.xl}px)`,
xxl: `@media screen and (min-width: ${breakpointMap.xxl}px)`,
nav: `@media screen and (min-width: ${breakpointMap.lg}px)`,
};


const colors: {[key: string]:string} = {
  black: "#000000",
  darkBlue: "#055C9D",
  lightBlue: "#91CCFF",
  red: "#da1f3d",
  white: "#FFFFFF",
  yellow: "#ffd51e",
}

export default { mediaQueries, colors };