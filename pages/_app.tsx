import React, { useEffect } from "react"
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
import { useRouter } from "next/router"
import { pageviewGTM, GTM_ID } from "../src/gtm/gtm"
import Script from "next/script"

export default function MyApp({ Component, pageProps }) {
  const config = useWagmi()

  const router = useRouter()
  useEffect(() => {
    router.events.on("routeChangeComplete", pageviewGTM)
    return () => {
      router.events.off("routeChangeComplete", pageviewGTM)
    }
  }, [router.events])

  return (
    <WagmiConfig config={config}>
      <GlobalContext>
        <ThemeProvider theme={theme}>
          {process.env.NODE_ENV !== "development" && (
            <Script
              id="gtag-base"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
          `,
              }}
            />
          )}
          <Wrapper>
            <ModalProvider>
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
