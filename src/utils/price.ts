import { BigNumber } from "ethers"
import JSBI from "jsbi"

const Q96 = BigNumber.from(2).pow(96)
const Q192 = Q96.pow(2)

// price = sqrtRatioX96 ** 2 / 2 ** 192
export const getToken0Price = (sqrtRatioX96: BigNumber) => {
    const n = sqrtRatioX96.pow(2)
    console.log(n)
    return Q192.div(n)
}

// price =  2 ** 192 / sqrtRatioX96 ** 2
export const getToken1Price = (sqrtRatioX96: BigNumber) => {
    const n = sqrtRatioX96.pow(2)

    return n.div(Q192)
} 