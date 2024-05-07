export const GTM_ID = "GTM-NLXLPBF"

export const pageviewGTM = (url) => {
  if (process.env.NODE_ENV !== "development")
    window.dataLayer.push({
      event: "pageview",
      page: url,
    })
}

export const connectWalletGTM = () => {
  if (process.env.NODE_ENV !== "development")
    window.dataLayer.push({ event: "connectWallet" })
}

export const depositGTM = (amount) => {
  if (process.env.NODE_ENV !== "development")
    window.dataLayer.push({ event: "deposit", amount })
}

export const createGTM = () => {
  if (process.env.NODE_ENV !== "development")
    window.dataLayer.push({ event: "create" })
}
