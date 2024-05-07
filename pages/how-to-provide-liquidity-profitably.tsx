import React from "react"
import HowToProvideLiquidity from "../src/views/HowToProvideLiquidity"
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
        <title>How to Provide Liquidity Profitably - TidePools.io</title>
        <meta
          name="description"
          content="How to provide liquidity profitably isn't as easy as it sounds! Learn how to get the most out of your crypto."
        />
      </Head>
      <HowToProvideLiquidity />
    </>
  )
}

export default Wrapper
