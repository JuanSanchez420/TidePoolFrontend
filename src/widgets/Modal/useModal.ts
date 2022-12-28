import React, { useCallback, useContext } from "react"
import { Context } from "./ModalContext"

export type Handler = () => void

const useModal = (
  modal: React.ReactNode,
  modalId = "defaultNodeId"
): [Handler, Handler] => {
  const { onPresent, onDismiss } = useContext(Context)

  const onPresentCallback = useCallback(() => {
    onPresent(modal, modalId)
  }, [modal, modalId, onPresent])

  return [onPresentCallback, onDismiss]
}

export default useModal
