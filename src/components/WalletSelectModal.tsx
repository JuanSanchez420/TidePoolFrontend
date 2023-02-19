import { useContext } from "react"
import styled from "styled-components"
import { Connector, useConnect } from "wagmi"
import { Flex } from "."
import { Global } from "../context/GlobalContext"
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
  const { setDefaultNetwork } = useContext(Global)
  const { connectAsync, connectors } = useConnect()

  const handleConnect = async (c: Connector<any, any, any>) => {
    const r = await connectAsync({ connector: c })
    if (r && !r.chain.unsupported) {
      setDefaultNetwork(r.chain.id)
    }
    onDismiss()
  }

  return (
    <Container flexDirection="column" justifyContent="space-evenly">
      {connectors.map((c) => (
        <Button key={c.name} onClick={() => handleConnect(c)}>
          {c.name}
        </Button>
      ))}
    </Container>
  )
}

export default WalletSelectModal
