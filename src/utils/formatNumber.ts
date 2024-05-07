
const formatNumber = (n: number | string): string => {
    if (typeof n === "string") {
        n = parseFloat(n)
    }
    
    if(n < 0.0001) {
        return n.toLocaleString(undefined, { maximumFractionDigits: 8 })
    }

    if (n < 1) {
        return n.toLocaleString(undefined, { maximumFractionDigits: 4 })
    }

    if (n < 100) {
        return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
    }

    return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
}

export default formatNumber