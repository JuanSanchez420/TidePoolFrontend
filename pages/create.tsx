import Head from "next/head"
import React from "react"
import Create from "../src/views/Create"

export async function getStaticProps(context) {
  return {
    props: {},
  }
}

const Wrapper = () => {
  return (
    <>
      <Head>
        <title>Create a TidePool - TidePools.io</title>
        <meta
          name="description"
          content="Create a TidePool to automate your Uniswap V3 liquidity for each network: Ethereum, Optimism, Polygon, and Arbitrum."
        />
      </Head>
      <Create />
    </>
  )
}

export default Wrapper
