const getUniswapInfoLink = (
  network: string,
  address: string,
  type: "pools" | "tokens"
) => {
  const base = "https://info.uniswap.org/#/"

  return `${base}${
    network.toLowerCase() !== "ethereum" ? `${network.toLowerCase()}/` : ""
  }${type}/${address.toLowerCase()}`
}

export default getUniswapInfoLink
