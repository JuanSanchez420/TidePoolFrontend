import styled from "styled-components"
import { Flex } from "."
import useWallet from "../hooks/useWallet"
import { Handler } from "../widgets/Modal/useModal"
import { Button } from "./"

const Container = styled(Flex)`
  border: 1px solid white;
  border-radius: 1rem;
  padding: 5px 15px;
  background-color: ${({ theme }) => theme.colors.lighterBlue};
  width: 100%;
  max-width: 20rem;
  height: 100%;
  max-height: 8rem;
  z-index: ${({ theme }) => theme.zIndices.modal};
`

const WalletSelectModal = ({ onDismiss }: { onDismiss: Handler }) => {
  const { connect } = useWallet()
  return (
    <Container flexDirection="column" justifyContent="space-evenly">
      <Button
        onClick={() => {
          connect("metamask")
          onDismiss()
        }}
      >
        MetaMask
      </Button>
      <Button
        onClick={() => {
          connect("walletconnect")
          onDismiss()
        }}
      >
        WalletConnect
      </Button>
    </Container>
  )
}

export default WalletSelectModal
