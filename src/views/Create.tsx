import { useState, useMemo, useContext } from "react"
import { Flex, Box, Text, Button, Dots, Heading } from "../components"
import { Chevron, External } from "../components/Icons"
import { TextInput } from "../components/Input"
import useFactory from "../hooks/useFactory"
import styled from "styled-components"
import { CreateState } from "../info/types"
import { isAddress } from "ethers/lib/utils"
import { Global } from "../context/GlobalContext"
import { useRouter } from "next/router"
import NetworkSelect from "../components/NetworkSelect"
import getUniswapInfoLink from "../utils/getUniswapInfoLink"
import { createGTM } from "../gtm/gtm"
import Link from "next/link"

const BackLink = styled(Link)`
  color: white;
  text-align: center;
  :hover {
    text-decoration: underline;
  }
`

const ActionsContainer = styled(Box)`
  width: 100%;
  max-width: 400px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.lighterBlue};
  border-radius: 1rem;
  padding: 15px;
  margin-top: 1rem;

  input::placeholder {
    color: white;
  }
`

const Container = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  max-width: 600px;
  margin: auto;
  z-index: 11;
  position: relative;
  overflow: hidden;
  color: white;
`

const DarkContainer = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  z-index: 11;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.darkBlue};
  border-radius: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const ExternalLink = styled.a`
  padding: 0.1rem;
  color: white;
`

const Question = styled.a`
  color: ${({ theme }) => theme.colors.yellow};
  font-weight: 700;
  :hover {
    cursor: pointer;
  }
  margin-bottom: 1rem;
`
const Answer = styled(Text)`
  margin-bottom: 1rem;
  margin-left: 2rem;
  color: white;
`

const DetailText = styled(Text)`
  color: ${({ theme }) => theme.colors.yellow};
  font-size: 0.85rem;
  overflow-wrap: break-word;
`

const CreateTidePool = () => {
  const router = useRouter()
  const { theList, network } = useContext(Global)
  const [selected, setSelected] = useState("")
  const [address, setAddress] = useState<string | null>(null)
  const { state, deploy } = useFactory()
  const [faqs, setFaqs] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const toggle = (faq: string) => {
    if (faqs.includes(faq)) {
      setFaqs(faqs.filter((f) => f !== faq))
    } else {
      setFaqs([...faqs, faq])
    }
  }

  const createPool = async () => {
    if (!isAddress(selected)) return alert("Invalid address")
    const exists = theList.tidePools.find(
      (p) => p.poolAddress.toLowerCase() === selected.toLowerCase()
    )
    if (exists) return alert("Pool already exists")
    const r = await deploy(selected)
    if (r) {
      setAddress(r)
      createGTM()
    }
  }

  const Actions = ({ state, pool }: { state: CreateState; pool: string }) =>
    useMemo(() => {
      if (state === CreateState.PENDING)
        return (
          <Button disabled>
            <Dots>Creating Pool</Dots>
          </Button>
        )
      if (state === CreateState.UPDATING_API)
        return (
          <Button disabled>
            <Dots>Updating API</Dots>
          </Button>
        )
      if (state === CreateState.DONE)
        return (
          <Button onClick={() => router.push(`/${network.name}/${address}`)}>
            Click to go to your pool!
          </Button>
        )

      return (
        <Button disabled={pool === ""} onClick={() => createPool()}>
          Create TidePool
        </Button>
      )
    }, [state, pool])

  return (
    <Box mx="auto" width="100%">
      <Container>
        <Heading>Create A New TidePool</Heading>
        <Text>
          Want to use TidePools for a UniswapV3 pool you don't see listed?
          Create one.
        </Text>
        <ExternalLink href="/create#FAQs">View FAQs</ExternalLink>
        <DarkContainer>
          <Heading>Create TidePool</Heading>

          <Flex mt="1rem" alignItems="center">
            <Text>1. Choose your chain: </Text>
            <NetworkSelect open={open} setOpen={setOpen} network={network} />
          </Flex>
          <Text my="1rem">
            2. Find a{" "}
            <ExternalLink
              href={getUniswapInfoLink(network?.name, "", "pools")}
              target="_blank"
            >
              Uniswap V3 Pool address
              <External height="1rem" width="1rem" />
            </ExternalLink>
          </Text>
          <DetailText>
            Once you find the pool, click to view pool details.
          </DetailText>
          <DetailText>
            The pool address can then be copied from the URL. Example:
          </DetailText>
          <ul>
            <li>
              <DetailText>
                URL:
                https://info.uniswap.org/#/pools/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640
              </DetailText>
            </li>
            <li>
              <DetailText>
                Pool Address: 0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640
              </DetailText>
            </li>
          </ul>
          <DetailText></DetailText>
          <Text>
            3. Paste the address of the pool into the box below and click
            "Create TidePool"
          </Text>
          <ActionsContainer>
            <Flex flexDirection="column" justifyContent="space-evenly">
              <Box mb="1rem">
                <TextInput
                  value={selected}
                  setValue={setSelected}
                  placeholder="UniswapV3 Pool address"
                />
              </Box>
              <Box maxWidth="20rem" mx="auto">
                <Actions state={state} pool={selected} />
              </Box>
            </Flex>
          </ActionsContainer>
        </DarkContainer>
        <a id="FAQs" />
        <Flex justifyContent="center">
          <BackLink href="/pools">Back to all pools</BackLink>
        </Flex>
        <Heading my="1rem">Create New TidePool FAQs</Heading>
        <Question onClick={() => toggle("cost")}>
          <Flex>
            <Text width="12px" mr="5px">
              <Chevron open={faqs.includes("cost")} />
            </Text>

            <Text>How much does creating a TidePool cost?</Text>
          </Flex>
        </Question>
        {faqs.includes("cost") && (
          <Answer>
            <Text>
              Here are the estimated costs per network. Cost will vary with
              network usage.
            </Text>
            <ul>
              <li>Ethereum: 0.068133671497970085 ETH ($81.94)</li>
              <li>Arbitrum: 0.0004556015 ETH ($0.55)</li>
              <li>Optimism: 0.000118097067 ETH ($0.20)</li>
              <li>Polygon: 0.153569502867533328 MATIC ($0.12)</li>
              <li>BSC: 0.021323715 BNB ($6.77)</li>
            </ul>
            <Text>
              There are no more costs after creation. We take care of the rest!
            </Text>
          </Answer>
        )}
        <Question onClick={() => toggle("control")}>
          <Flex>
            <Text width="12px" mr="5px">
              <Chevron open={faqs.includes("control")} />
            </Text>

            <Text>Do I control the TidePool if I create it?</Text>
          </Flex>
        </Question>
        {faqs.includes("control") && (
          <Answer>
            No. There are no special permissions with any TidePool, even for the
            owner or creator.
          </Answer>
        )}
        <Question onClick={() => toggle("bad address")}>
          <Flex>
            <Text width="12px" mr="5px">
              <Chevron open={faqs.includes("bad address")} />
            </Text>
            <Text>What if someone puts a bad address in there?</Text>
          </Flex>
        </Question>
        {faqs.includes("bad address") && (
          <Answer>
            All addresses are checked directly with the Uniswap factory to make
            sure you can't screw this up or steal from someone.
          </Answer>
        )}
      </Container>
    </Box>
  )
}

export default CreateTidePool
