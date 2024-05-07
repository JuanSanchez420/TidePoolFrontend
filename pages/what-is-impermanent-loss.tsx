import React from "react"
import ImpermanentLoss from "../src/views/ImpermanentLoss"
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
        <title>What is Impermanent Loss? - TidePools.io</title>
        <meta
          name="description"
          content="What is Impermanent Loss and how to we avoid it? Read here to learn more how TidePools.io protects your crypto."
        />
      </Head>
      <ImpermanentLoss />
    </>
  )
}

export default Wrapper
