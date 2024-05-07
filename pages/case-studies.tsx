import React from "react"
import CaseStudies from "../src/views/CaseStudies"
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
        <title>
          Case Studies for Providing Liquidity on Uniswap V3 - TidePools.io
        </title>
        <meta
          name="description"
          content="Several case studies for providing liquidity on Uniswap V3. We show how TidePools.io generated returns of 40-69%!"
        />
      </Head>
      <CaseStudies />
    </>
  )
}

export default Wrapper
