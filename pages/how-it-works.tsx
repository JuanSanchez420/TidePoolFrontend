import Head from "next/head"
import React from "react"
import HowItWorks from "../src/views/HowItWorks"

export async function getStaticProps(context) {
  return {
    props: {},
  }
}

const Wrapper = () => {
  return (
    <>
      <Head>
        <title>How It Works - TidePools.io</title>
        <meta
          name="description"
          content="How does TidePools.io work? Learn how to earn passive income by staking your assets using Uniswap V3 liquidity pools."
        />
      </Head>
      <HowItWorks />
    </>
  )
}

export default Wrapper
