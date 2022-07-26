import { useCallback, useState } from "react"
import { CreateState } from "../info/types"
import { useFactoryContract } from "./useContract"

const useFactory = () => {
  const contract = useFactoryContract()
  const [state, setState] = useState<CreateState>(CreateState.DOESNT_EXIST)

  const deploy = useCallback(
    async (address: string) => {
      let r = null
      try {
        setState(CreateState.PENDING)
        const tx = await contract?.deploy(address)
        const receipt = await tx.wait()
        console.log(receipt)
        r = receipt.events[2].args.TidePoolCreated
        setState(r ? CreateState.DONE : CreateState.ERROR)
      } catch (e) {
        console.log(e)
        setState(CreateState.ERROR)
      }
      return r
    },
    [contract]
  )

  return {
    state,
    deploy,
  }
}

export default useFactory
