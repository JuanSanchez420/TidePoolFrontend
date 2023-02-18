import React from "react"
import HowItWorks from "../src/views/HowItWorks"

export async function getStaticProps(context) {
  return {
    props: {},
  }
}

const Wrapper = () => {
  return <HowItWorks />
}

export default Wrapper
