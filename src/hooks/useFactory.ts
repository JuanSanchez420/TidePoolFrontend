import { useCallback, useContext, useState } from "react"
import { Global } from "../context/GlobalContext"
import { CreateState } from "../info/types"
import { useFactoryContract } from "./useContract"

const useFactory = () => {
  const contract = useFactoryContract()
  const {network} = useContext(Global)
  const [state, setState] = useState<CreateState>(CreateState.DOESNT_EXIST)

  const deploy = useCallback(
    async (address: string) => {
      let r = null
      try {
        setState(CreateState.PENDING)
        const tx = await contract?.deploy(address)
        const receipt = await tx.wait()

        r = receipt.events[2].args.tidePool
        await fetch(`/poolcreated?address=${r}&network=${network.name}`)
        setState(CreateState.DONE)
      } catch (e) {
        console.log(e)
        setState(CreateState.ERROR)
      }
      return r
    },
    [contract, network]
  )

  return {
    state,
    deploy,
  }
}

export default useFactory
