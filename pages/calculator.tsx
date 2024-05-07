import React from "react"
import Calculator from "../src/views/Calculator"
import Head from "next/head"

const Wrapper = () => {
  return (
    <>
      <Head>
        <title>Uniswap V3 Calculator - TidePools.io</title>
        <meta
          name="description"
          content="Calculate the fees and returns of your Uniswap V3 liquidity pool."
        />
      </Head>
      <Calculator />
    </>
  )
}

export default Wrapper
