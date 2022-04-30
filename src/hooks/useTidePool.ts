import { useState, useEffect } from "react"
import { useTidePoolContract } from "./useContract"
import { BigNumber } from "ethers"

const useTidePool = (address: string, user?: string) => {
    const contract = useTidePoolContract(address)
    const [balance, setBalance] = useState(BigNumber.from(0))

    useEffect(()=>{
        const getBalance = async ()=> {
            setBalance(await contract.balanceOf(user))
        }
        if(user) getBalance()
    },[contract, user])

    const deposit = async (zero: BigNumber, one: BigNumber) => {
        try{
            await contract.deposit(zero, one)
        } catch(e) {
            console.log(e)
        }
    }

    const withdraw = async () => {
        try {
            await contract.withdraw()
        } catch(e) {
            console.log(e)
        }
    }

    return {
        balance,
        deposit,
        withdraw,
        contract
    }
}

export default useTidePool