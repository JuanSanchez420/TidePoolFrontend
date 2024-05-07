import React from "react"
import Home from "../src/views/Home"
import Head from "next/head"

export async function getStaticProps(context) {
  return {
    props: {},
  }
}

const Layout = () => {
  return (
    <>
      <Head>
        <title>TidePools.io - Crypto Passive Income</title>
        <meta
          name="description"
          content="TidePools.io is a crypto passive income platform that allows you to earn by
          staking your assets using Uniswap V3 liquidity pools."
        />
      </Head>
      <Home />
    </>
  )
}

export default Layout
