import React, { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from 'styled-components'
import theme from "./info/theme"
import { Wrapper, Box, Flex, LoadingLogo, DarkWrapper } from "./components/index"
import { Header } from "./components/Header"
import { GlobalContext } from "./context/GlobalContext"

const Home = lazy(()=>import("./views/Home"))
const TidePool = lazy(()=>import("./views/TidePool"))
const Create = lazy(()=>import("./views/Create"))
const FAQ = lazy(()=>import("./views/FAQ"))

const Loading = () => {
  return (
    <Flex height="100%" width="100%" justifyContent="center" alignItems="center">
      <LoadingLogo/>
    </Flex>
  )
}

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalContext>
      <Wrapper>
        <Suspense fallback={<Loading/>}>
          <DarkWrapper>
            <Box maxWidth="1000px" m="auto">
              <Header/>
            </Box>
          </DarkWrapper>
          <Box maxWidth="1000px" m="auto">
            <Outlet/>
          </Box>
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
        <Route index element={<Home />}/>
        <Route path="/:network/:address" element={<TidePool />}/>
        <Route path="/create" element={<Create />}/>
        <Route path="/faq" element={<FAQ />}/>
      </Route>
    </Routes>
  );
}

export default TidePools;
