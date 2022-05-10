import React, { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from 'styled-components'
import theme from "./info/theme"
import { Wrapper, Box } from "./components/index"
import { Header } from "./components/Header"
import { GlobalContext } from "./context/GlobalContext"

const Home = lazy(()=>import("./views/Home"))
const TidePool = lazy(()=>import("./views/TidePool"))
const Create = lazy(()=>import("./views/Create"))

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalContext>
      <Wrapper>
        <Box maxWidth="1000px" m="auto">
          <Suspense fallback={<div>Loading</div>}>
            <Header/>
            <Outlet/>
          </Suspense>
        </Box>
      </Wrapper>
      </GlobalContext>
    </ThemeProvider>
  )
}

function FrenMoney() {
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path="/:network/:address" element={<TidePool />}/>
        <Route path="/create" element={<Create />}/>
      </Route>
    </Routes>
  );
}

export default FrenMoney;
