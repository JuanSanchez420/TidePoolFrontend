import { useState } from "react"
import { Box, Flex, Heading, Text } from "../components"
import styled from "styled-components"
import Link from "next/link"

const ExternalLink = styled(Link)`
  color: white;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  padding: 0.1rem;
`

const Container = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  max-width: 1000px;
  margin: auto;
  z-index: 11;
  position: relative;
  overflow: hidden;
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

const list: { question: string; answer: string }[] = [
  {
    question: "What is TidePools.io?",
    answer:
      "TidePools.io manages Uniswap V3 liquidity pools for you, rebalancing when necessary to generate maximum fees. Passively!",
  },
  {
    question: "How does it work?",
    answer:
      "<ol><li>Find the TidePool you want on your network</li><li>Approve one or both of the tokens</li><li>Deposit any amount of one/both of the tokens</li></ol><br/>That's it!",
  },
  {
    question: "Are you affiliated with Uniswap?",
    answer:
      "No. TidePools.io contracts simply interact with Uniswap contracts, making it the liquidity provider process smoother. It's a 'DeFi lego'.",
  },
  {
    question: "How did TidePools.io get started?",
    answer:
      "I built this for myself because managing Uniswap V3 liquidity pools is too frustrating. I just wanted to deposit into a liquidity pool and do nothing. TidePools.io manages everything for you, while generating more interest over a V2 pool!",
  },
  {
    question: "Is is secure?",
    answer:
      "TidePools.io passed its audit by Mythx.io. The contracts were designed to have zero special permissions: even if the owning wallet is hacked, there's nothing the hacker can do to take your crypto. The math is simple to prevent economic exploits.",
  },
  {
    question: "What are the factory addresses?",
    answer:
      "<ul><li>Ethereum: 0xaf2cf343735d6dd59f659f9cbbfb80e3d13f318d</li><li>Arbitrum: 0xaf4abf251a10b02e0e1f8501b4d720b9228ed9dc</li><li>Optimism: 0xb7c879ac00c0d73d7ee2cfa37aa05a286a3147da</li><li>Polygon: 0x5b63d2ed03ce68889432c045ce4fc095984d24ec</li><li>Binance: 0x451d89c2Ef29F5e4b373dA42738A89B9455ec4b4</li></ul><br/>These are the official factory addresses. All TidePools can be found in this contract.",
  },
  {
    question: "What does the 'Create' TidePool page do?",
    answer:
      "All users are able to create their own TidePools for any Uniswap V3pool. If you see a juicy APR but don't want to manage the V3 pool,just create a TidePool and let us manage the pool for you!",
  },
  {
    question: "What is the fee?",
    answer:
      "TidePools.io will take 5% of the profit generated from liquidity provisions. Other liquidity pool optimizers take 10-30%.",
  },
  {
    question: "What is the APR?",
    answer:
      "APR is listed next to each tidepool. It changes day to day with volatility. Visit 'Case Studies' to see how much you can earn with TidePools.io!",
  },
  {
    question: "Does TidePools.io have a token?",
    answer:
      "No. Other liquidity pool optimizers have a token so you can get revenue sharing, but we give you the best rate up front without the need for a token.",
  },
  {
    question: "What is the 'TPOOL' token?",
    answer:
      "The TPOOL token is a receipt for your position in the liquidity pool. It's how TidePools.io tracks your deposit.",
  },
  {
    question: "What networks does TidePools.io support?",
    answer:
      "TidePools.io works on networks where Uniswap V3 is deployed: Ethereum, Arbitrum, Optimism, Binance, and Polygon. If Uniswap expands to other chains, we'll also deploy there as well.",
  },
]

const FAQ = () => {
  const [faqs, setFaqs] = useState<string[]>([])

  const QuestionAndAnswer = (question: string, answer: string, key: string) => {
    return (
      <>
        <Question key={key} onClick={() => toggle(question)}>{question}</Question>
        {faqs.includes(question) && (
          <Answer dangerouslySetInnerHTML={{ __html: answer }} />
        )}
      </>
    )
  }

  const toggle = (faq: string) => {
    if (faqs.includes(faq)) {
      setFaqs(faqs.filter((f) => f !== faq))
    } else {
      setFaqs([...faqs, faq])
    }
  }
  return (
    <Box mx="auto" width="100%">
      <Container>
        <Heading>FAQ</Heading>
        <Text color="white" my="1rem">
          Have a question that isn't answered here or on the{" "}
          <ExternalLink href="/how-it-works">How It Works</ExternalLink> page?
          Ask us on{" "}
          <ExternalLink
            href="https://twitter.com/JuanSanchez0x0"
            target="_blank"
          >
            Twitter
          </ExternalLink>
          !
        </Text>
        {list.map((item, index) => {
          return QuestionAndAnswer(item.question, item.answer, `faq-${index}`)
        })}
      </Container>
    </Box>
  )
}

export default FAQ
