import { useCallback, useContext, useState } from "react"
import { Global } from "../context/GlobalContext"
import { CreateState } from "../info/types"
import { useFactoryContract } from "./useContract"
import { usePublicClient } from "wagmi"

const useFactory = () => {
  const contract = useFactoryContract()
  const { network } = useContext(Global)
  const [state, setState] = useState<CreateState>(CreateState.DOESNT_EXIST)
  const publicClient = usePublicClient()

  const deploy = useCallback(
    async (address: string) => {
      let r = null
      try {
        setState(CreateState.PENDING)
        if (!contract) return r
        const hash = await contract.write.deploy([address])
        await publicClient.waitForTransactionReceipt({ hash })
        r = await contract.read.getTidePool([address]) as string
        setState(CreateState.UPDATING_API)
        await fetch(`/poolcreated?address=${r}&network=${network.name}`)
        setState(CreateState.DONE)
      } catch (e) {
        console.log(e)
        setState(CreateState.ERROR)
      }
      return r
    },
    [contract, network, publicClient]
  )

  return {
    state,
    deploy,
  }
}

export default useFactory
