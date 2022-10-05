import React, { lazy, Suspense } from "react"
import { Web3ReactProvider } from "@web3-react/core"
import { Routes, Route, Outlet } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import theme from "./info/theme"
import { Wrapper, Flex, LoadingLogo, DarkWrapper } from "./components/index"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { GlobalContext } from "./context/GlobalContext"
import { getLibrary } from "./utils/web3React"

const Home = lazy(() => import("./views/Home"))
const TidePool = lazy(() => import("./views/TidePool"))
const List = lazy(() => import("./views/List"))
const Create = lazy(() => import("./views/Create"))
const FAQ = lazy(() => import("./views/FAQ"))

const Layout = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <GlobalContext>
          <Wrapper>
            <Suspense fallback={<LoadingLogo />}>
              <DarkWrapper>
                <Header />
              </DarkWrapper>
              <Flex width="100%" justifyContent="center" flex="1 0 auto">
                <Outlet />
              </Flex>
              <DarkWrapper>
                <Footer />
              </DarkWrapper>
            </Suspense>
          </Wrapper>
        </GlobalContext>
      </ThemeProvider>
    </Web3ReactProvider>
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
