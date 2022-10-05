import React, { useState, useMemo } from "react"
import { Flex, Box, Text, Button, Dots } from "../components"
import { External } from "../components/Icons"
import { TextInput } from "../components/Input"
import useFactory from "../hooks/useFactory"
import styled from "styled-components"
import { CreateState } from "../info/types"
import { Link } from "react-router-dom"
import useNetwork from "../hooks/useNetwork"

const ActionsContainer = styled(Box)`
  width: 100%;
  max-width: 400px;
  margin: auto;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 0.5rem;
  padding: 10px;
`

const ContentContainer = styled(Box)`
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 0.5rem;
  padding: 10px;
`

const ExternalLink = styled(Link)`
  background-color: ${(props) => props.theme.colors.lightBlue};
  padding: 0.1rem;
`

const Question = styled(Text)`
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-style: italic;
  font-size: 20px;
`
const Answer = styled(Text)`
  margin-bottom: 1rem;
`

const CreateTidePool = () => {
  const network = useNetwork()
  const [selected, setSelected] = useState("")
  const [address, setAddress] = useState(null)
  const { state, deploy } = useFactory()

  const createPool = async () => {
    const r = await deploy(selected)
    console.log(r)
    if (r) setAddress(r)
  }

  const Actions = ({ state, pool }: { state: CreateState; pool: string }) =>
    useMemo(() => {
      if (state === CreateState.PENDING)
        return (
          <Button disabled>
            <Dots>Creating Pool</Dots>
          </Button>
        )
      if (state === CreateState.DONE)
        return (
          <Button
            onClick={() =>
              (window.location.href = `/${network.name}/${address}`)
            }
          >
            Click to go to your pool
          </Button>
        )

      return (
        <Button disabled={pool === ""} onClick={() => createPool()}>
          Create Pool
        </Button>
      )
    }, [state, pool])

  return (
    <Flex flexDirection="column" p="1rem" width="100%">
      <ActionsContainer>
        <Flex flexDirection="column" justifyContent="space-evenly">
          <Box mb="1rem">
            <TextInput
              value={selected}
              setValue={setSelected}
              placeholder="UniswapV3 Pool address"
            />
          </Box>
          <Actions state={state} pool={selected} />
        </Flex>
      </ActionsContainer>
      <ContentContainer>
        <Text>
          Want to use TidePools for a UniswapV3 pool you don't see listed?
          Create one!
        </Text>
        <ol>
          <li>Choose your chain</li>
          <li>
            Find a{" "}
            <ExternalLink to="https://info.uniswap.org/#/pools">
              Uniswap V3 Pool address
              <External height="1rem" width="1rem" />
            </ExternalLink>
          </li>
          <li>Paste the address of the pool into the box above</li>
          <li>Click "Create Pool" and run the transaction</li>
        </ol>
        <Text>
          That's it! A TidePool will be created and ready for use immediately.
        </Text>
        <Text fontWeight="900" fontSize="x-large" my="1rem">
          CREATING A TIDEPOOL FAQ
        </Text>
        <Question>"How much does creating a TidePool cost?"</Question>
        <Answer>
          <Text>
            Here are the estimated costs per network. Cost will vary with
            network usage.
          </Text>
          <ul>
            <li>Ethereum: 0.12879538ETH ($215)</li>
            <li>Arbitrum: 0.00085288105251 ETH ($1.50)</li>
            <li>Optimism: 0.000118097067 ETH ($0.20)</li>
            <li>Polygon: 0.129863760073589464 MATIC ($0.08)</li>
          </ul>
          <Text>
            There are no more costs after creation. We take care of the rest!
          </Text>
        </Answer>
        <Question>"Do I control the TidePool if I create it?"</Question>
        <Answer>
          No. There are no special permissions with any TidePool, even for the
          owner or creator.
        </Answer>
        <Question>"What if someone puts a bad address in there?"</Question>
        <Answer>
          All addresses are checked directly with the Uniswap factory to make
          sure you can't screw this up or steal from someone.
        </Answer>
      </ContentContainer>
    </Flex>
  )
}

export default CreateTidePool
