import React from "react"
import { Box, Text } from "../components"
import styled from "styled-components"

const ContentContainer = styled(Box)`
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 0.5rem;
  padding: 10px;
`

const ExternalLink = styled.a`
  color: white;
  background-color: ${(props) => props.theme.colors.lightBlue};
  padding: 0.1rem;
`

const Question = styled(Text)`
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-style: italic;
  font-size: large;
`
const Answer = styled(Text)`
  margin-bottom: 1rem;
`

const FAQ = () => {
  return (
    <>
      <ContentContainer>
        <Question>"What is TidePools.io?"</Question>
        <Answer>
          TidePools.io manages Uniswap V3 liquidity pools for you, rebalancing
          when necessary to generate maximum fees. Passively!
        </Answer>
        <Question>"How does it work?"</Question>
        <Answer>
          <ol>
            <li>Find the TidePool you want on your network</li>
            <li>Approve one or both of the tokens</li>
            <li>Deposit any amount of one/both of the tokens</li>
          </ol>
          That's it!
        </Answer>
        <Question>"Are you affiliated with Uniswap?"</Question>
        <Answer>
          No. TidePools.io contracts simply interact with Uniswap contracts,
          making it the liquidity provider process smoother. It's a "DeFi lego".
        </Answer>
        <Question>"How did TidePools.io get started?"</Question>
        <Answer>
          I built this for myself because managing Uniswap V3 liquidity pools is
          too frustrating. I just wanted to deposit into a liquidity pool and do
          nothing. TidePools.io manages everything for you, while generating
          more interest over a V2 pool!
        </Answer>
        <Question>"Is is secure?"</Question>
        <Answer>
          TidePools.io passed its audit by Mythx.io. The contracts were designed
          to have zero special permissions: even if the owning wallet is hacked,
          there's nothing the hacker can do to take your crypto. The math is
          simple to prevent economic exploits.
        </Answer>
        <Question>"What are the factory addresses?"</Question>
        <Answer>
          <ul>
            <li>
              <ExternalLink href="https://etherscan.io/address/0xa2d974be6aa43d38c087e9de221801baccab252b">
                Ethereum: 0xa2d974be6aa43d38c087e9de221801baccab252b
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://arbiscan.io/address/0xc28eaa5051c0cfb8a493749990787d0190e8300f">
                Arbitrum: 0xc28eaa5051c0cfb8a493749990787d0190e8300f
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://optimistic.etherscan.io/address/0xa2d974be6aa43d38c087e9de221801baccab252b">
                Optimism: 0xa2d974be6aa43d38c087e9de221801baccab252b
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://polygonscan.com/address/0x59b81a9b35d94000f40c3e0e7894d7762a526a36">
                Polygon: 0x59b81a9b35d94000f40c3e0e7894d7762a526a36
              </ExternalLink>
            </li>
          </ul>
          These are the official factory addresses. All TidePools can be found
          in this contract.
        </Answer>
        <Question>"What does the 'Create' TidePool page do?"</Question>
        <Answer>
          All users are able to create their own TidePools for any Uniswap V3
          pool. If you see a juicy APR but don't want to manage the V3 pool,
          just create a TidePool and let us manage the pool for you!
        </Answer>
        <Question>"What is the fee?"</Question>
        <Answer>
          TidePools.io will take 10% of the profit generated from liquidity
          provisions. Other liquidity pool optimizers take 20-30%.
        </Answer>
        <Question>"What is the APR?"</Question>
        <Answer>
          We're working on automating this. Soon(TM). APR will be higher then
          traditional liquidity pools, but varies day to day.
        </Answer>
        <Question>"Does TidePools.io have a token?"</Question>
        <Answer>
          No. Other liquidity pool optimizers have a token so you can get
          revenue sharing, but we give you the best rate up front without the
          need for a token.
        </Answer>
        <Question>"What is the "TPOOL" token?"</Question>
        <Answer>
          The TPOOL token is a receipt for your position in the liquidity pool.
          It's how TidePools.io tracks your deposit.
        </Answer>
        <Question>"What networks does TidePools.io support?"</Question>
        <Answer>
          TidePools.io works on networks where Uniswap V3 is deployed: Ethereum,
          Arbitrum, Optimism, and Polygon. If Uniswap expands to other chains,
          we'll also deploy there as well.
        </Answer>
      </ContentContainer>
    </>
  )
}

export default FAQ
