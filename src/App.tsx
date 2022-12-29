import { lazy, Suspense } from "react"
import { Web3ReactProvider } from "@web3-react/core"
import { Routes, Route, Outlet } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import theme from "./info/theme"
import { Wrapper, Flex, LoadingLogo, DarkWrapper } from "./components/index"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { GlobalContext } from "./context/GlobalContext"
import { getLibrary } from "./utils/web3React"
import ModalProvider from "./widgets/Modal/ModalContext"

window.Buffer = window.Buffer || require("buffer").Buffer

const Home = lazy(() => import("./views/Home"))
const TidePool = lazy(() => import("./views/TidePool"))
const List = lazy(() => import("./views/List"))
const Create = lazy(() => import("./views/Create"))
const FAQ = lazy(() => import("./views/FAQ"))
const HowItWorks = lazy(() => import("./views/HowItWorks"))
const Calculator = lazy(() => import("./views/Calculator"))

const Layout = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <GlobalContext>
          <Wrapper>
            <Suspense fallback={<LoadingLogo />}>
              <ModalProvider>
                <DarkWrapper>
                  <Header />
                </DarkWrapper>
                <Flex width="100%" justifyContent="center" flex="1 0 auto">
                  <Outlet />
                </Flex>
                <DarkWrapper>
                  <Footer />
                </DarkWrapper>
              </ModalProvider>
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
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/create" element={<Create />} />
        <Route path="/faq" element={<FAQ />} />
        <Route
          path="/uniswap-v3-calculator/:address"
          element={<Calculator />}
        />
      </Route>
    </Routes>
  )
}

export default TidePools
