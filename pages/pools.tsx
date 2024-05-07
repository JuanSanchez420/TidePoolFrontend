import React from "react"
import List from "../src/views/List"
import Head from "next/head"

export async function getStaticProps(context) {
  return {
    props: {},
  }
}

const Wrapper = () => {
  return (
    <>
      <Head>
        <title>All TidePools - TidePools.io</title>
        <meta
          name="description"
          content="View, stake, and create TidePools to automate your Uniswap V3 liquidity for each network: Ethereum, Optimism, Polygon, and Arbitrum."
        />
      </Head>
      <List />
    </>
  )
}

export default Wrapper
