import React, { lazy, Suspense } from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import theme from "./info/theme"
import {
  Wrapper,
  Box,
  Flex,
  LoadingLogo,
  DarkWrapper,
} from "./components/index"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { GlobalContext } from "./context/GlobalContext"

const Home = lazy(() => import("./views/Home"))
const TidePool = lazy(() => import("./views/TidePool"))
const List = lazy(() => import("./views/List"))
const Create = lazy(() => import("./views/Create"))
const FAQ = lazy(() => import("./views/FAQ"))

const Loading = () => {
  return (
    <Flex
      height="100%"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <LoadingLogo />
    </Flex>
  )
}

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalContext>
        <Wrapper>
          <Suspense fallback={<Loading />}>
            <DarkWrapper>
              <Box maxWidth="1000px" m="auto">
                <Header />
              </Box>
            </DarkWrapper>
            <Flex maxWidth="1000px" m="auto" flex="1 0 auto">
              <Outlet />
            </Flex>
            <DarkWrapper>
              <Box maxWidth="1000px" m="auto">
                <Footer />
              </Box>
            </DarkWrapper>
          </Suspense>
        </Wrapper>
      </GlobalContext>
    </ThemeProvider>
  )
}

function TidePools() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/pools" element={<List />} />
        <Route path="/:network/:address" element={<TidePool />} />
        <Route path="/create" element={<Create />} />
        <Route path="/faq" element={<FAQ />} />
      </Route>
    </Routes>
  )
}

export default TidePools
