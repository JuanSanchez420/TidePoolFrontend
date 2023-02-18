import React from "react"
import FAQ from "../src/views/HowItWorks"

export async function getStaticProps(context) {
  return {
    props: {},
  }
}

const Wrapper = () => {
  
  return <FAQ />
}

export default Wrapper
