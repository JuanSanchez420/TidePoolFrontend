import Head from "next/head"
import React from "react"
import TidePool from "../../src/views/TidePool"

const Wrapper = () => {
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
      <TidePool />
    </>
  )
}

export default Wrapper
