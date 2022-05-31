
interface Factory {
    chainId: number
    address: string
    block: number
}

export const getFactory = (chainId: number): Factory => {
    switch(chainId) {
        case 1:
            return { chainId, address: "0x0", block: 0}
        case 10:
            return { chainId, address: "0x0", block: 0}
        case 137:
            return { chainId, address: "0x51233465F2D1D51DEbd4eB055efc848d74d8905d", block: 28777777 }
        case 42161:
            return { chainId, address: "0x3395c4503acEc1CA99E1340a80c0E6620689D592", block: 13119180 }
        default:
            return { chainId, address: "0x0", block: 0}
    }
}