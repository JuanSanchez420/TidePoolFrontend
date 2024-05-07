import React from "react"
import FAQ from "../src/views/FAQ"
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
        <title>FAQ - TidePools.io</title>
        <meta
          name="description"
          content="Frequently asked questions about TidePools.io."
        />
      </Head>
      <FAQ />
    </>
  )
}

export default Wrapper
