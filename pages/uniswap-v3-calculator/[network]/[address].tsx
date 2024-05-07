import Head from "next/head"
import React from "react"
import Calculator from "../../../src/views/Calculator"

const Wrapper = () => {
  return (
    <>
      <Head>
        <title>Uniswap V3 Calculator - TidePools.io</title>
        <meta
          name="description"
          content="Calculate returns for Uniswap V3 liquidity pools."
        />
      </Head>
      <Calculator />
    </>
  )
}

export default Wrapper
