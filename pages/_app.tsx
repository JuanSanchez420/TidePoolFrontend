import React from "react"
import { ThemeProvider } from "styled-components"
import { WagmiConfig } from "wagmi"
import { DarkWrapper, Flex, Wrapper } from "../src/components"
import { Footer } from "../src/components/Footer"
import { Header } from "../src/components/Header"
import { GlobalContext } from "../src/context/GlobalContext"
import useWagmi from "../src/hooks/useWagmi"
import "../src/index.css"
import theme from "../src/info/theme"
import ModalProvider from "../src/widgets/Modal/ModalContext"
import Head from "next/head"

export default function MyApp({ Component, pageProps }) {
  const client = useWagmi()
  return (
    <WagmiConfig client={client}>
      <GlobalContext>
        <ThemeProvider theme={theme}>
          <Wrapper>
            <ModalProvider>
              <Head><title>TidePools.io - Crypto Passive Income</title></Head>
              <DarkWrapper>
                <Header />
              </DarkWrapper>
              <Flex width="100%" justifyContent="center" flex="1 0 auto">
                <Component {...pageProps} />
              </Flex>
              <DarkWrapper>
                <Footer />
              </DarkWrapper>
            </ModalProvider>
          </Wrapper>
        </ThemeProvider>
      </GlobalContext>
    </WagmiConfig>
  )
}
