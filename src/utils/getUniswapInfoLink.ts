const getUniswapInfoLink = (
  network: string,
  address: string,
  type: "pools" | "tokens"
) => {
  const base = "https://info.uniswap.org/#/"

  if (network.toLowerCase() === "ethereum")
    return `${base}${type}${address ? `/${address.toLowerCase()}` : ""}`

  if (network.toLowerCase() === "binance")
    return `${`${base}bnb/`}${type}${
      address ? `/${address.toLowerCase()}` : ""
    }`

  return `${base}${`${network.toLowerCase()}/`}${type}${
    address ? `/${address.toLowerCase()}` : ""
  }`
}

export default getUniswapInfoLink
