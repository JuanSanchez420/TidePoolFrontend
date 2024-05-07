import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document"
import React from "react"
import { ServerStyleSheet } from "styled-components"
import { GTM_ID } from "../src/gtm/gtm"

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      // eslint-disable-next-line no-param-reassign
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#000000" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@JuanSanchez0x0" />
          <meta name="twitter:title" content="TidePools.io" />
          <meta
            name="twitter:description"
            content="TidePools.io is a crypto passive income platform that allows you to earn by
          staking your assets using Uniswap V3 liquidity pools."
          />
          <meta
            name="twitter:image"
            content="https://tidepools.io/images/TidePoolsLogoTwitter.png"
          />
        </Head>
        <body>
          <noscript>
            {process.env.NODE_ENV !== "development" && (
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            )}
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
