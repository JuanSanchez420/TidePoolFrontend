import Link from "next/link"
import { Box, Flex, Text, Heading } from "../components"
import styled from "styled-components"

const ExternalLink = styled.a`
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

const T = styled(Text)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: white;
`

const StyledUL = styled.ul`
  color: white;
`

const HowToProvidLiquidity = () => {
  return (
    <Box mx="auto" width="100%">
      <Container>
        <Heading>How to provide liquidity profitably on Uniswap V3</Heading>
        <T>
          Uniswap V3 allows liquidity providers to do "concentrated liquidity",
          putting their assets in a narrow range to generate more rewards on the
          position. That sounds great, but a study showed that HALF of liquidity
          providers lose money with Uniswap V3! Uniswap accidentally created a
          "foot gun". How can we provide liquidity profitably on Uniswap V3?
        </T>
        <T>The short answer:</T>
        <StyledUL>
          <li>Choose the correct range</li>
          <li>Active pools</li>
          <li>Low TVL pools</li>
          <li>Non stable pairs</li>
          <li>Choose WETH/X pairs</li>
        </StyledUL>
        <Heading>How to choose the correct range for your liquidity?</Heading>
        <T>
          Putting liquidity in a tight range sounds good, but what happens when
          price leaves that range? Now you have a choice: unstake your assets
          and collect your fees, or swap and recreate the position. Every time
          you swap, add, or remove liquidity, you pay in fees and/or slippage.
          Even worse, tight ranges suffer more from impermanent/divergence loss.
        </T>
        <T>
          The best range is one where price always stays in your range and you
          don't have unused capital. How can you know what range price will stay
          in? The easiest way is to look at the previous time period and use
          that range. For example, if you plan to provide liquidity for a week,
          put it in the range that price traveled last week. If you want to
          stake WETH/USDT and last week price went from $1,350 to $1,500, that's
          your range: $150 from lower to upper limits.
        </T>
        <T>
          What if you want to provide continuous liquidity for an undetermined
          amount of time? You have to decide how often you want to rebalance the
          pool. Based on my case studies, an agressive rebalance plan would be
          more than 1x per week, a moderate rebalance plan would be 1x per
          month, and any less than that is passive. Fees and slippage are too
          hard to overcome with daily rebalances.
        </T>
        <T>
          Tidepools.io does this for you automatically. If the market becomes
          more volatile, the range increases on the next rebalance. If the pool
          is sleepy, the range shrinks to get more fees.
        </T>
        <Heading>Choose active pools</Heading>
        <T>
          There are some pools that are HOT! Maybe the coin has a new product,
          new narrative, or new release. It's a good idea to provide liquidity
          for the most active pools. What is "active"? Generally, it's when 24H
          swap volume is greater than TVL (total locked value).
        </T>
        <T>
          Don't freak out if activity drops for a few days or even a few weeks.
          Sometimes the entire market is quiet, like around holidays or summer
          breaks.{" "}
        </T>
        <Heading>Choose low TVL (total locked value) pools</Heading>
        <T>
          The less TVL is in a pool, the more rewards your position will collect
          because your position is a higher percentage of the pool. Don't be too
          judgemental about TVL, because liquidity is coming and going all the
          time. TVL can change +-30-50% in 24 hours. Also, the ranges of other
          positions could be larger, giving you solid rewards even though TVL is
          high. When in doubt, try out the pool and keep an eye on your rewards.
          If they're good, stick with it!
        </T>
        <T>
          Since this is so personal and variable based on the pool positions,
          I'll leave it up to you to check the APR and rewards your position is
          making and let you decide.
        </T>
        <Heading>Choose non-stablecoin pairs</Heading>
        <T>
          Everyone has the same idea: since USDT and USDC are supposed to be
          1:1, why not have a tiny range and collect max rewards? There are
          several problems with this: TVL, low rewards, and tail risk.
        </T>
        <T>
          Stablecoin pairs often have high TVL which dillute your position. Even
          worse, they have the lowest swap fees of any pair, giving the least
          rewards. Gross.
        </T>
        <T>
          The third problem of stablecoin pairs is tail risk: losing the peg,
          blacklisting, and regulation.
        </T>
        <T>
          What if the stablecoin loses the peg? Every single stablecoin has lost
          the peg at some point. Some stables regained the peg (USDT, USDC).
          Others didn't (UST). This is a textbook case of picking up pennies in
          front of a steamroller.
        </T>
        <T>
          Almost all stablecoins have blacklist functionality. If the issuer
          doesn't like your wallet, they can freeze your funds. It might not
          even be you they're after: they might shut down the pool you're in
          because of someone else's bad behavior! What if governments force the
          issuer to act against your wallet? There's nothing you can do. They
          didn't put the blacklist functionality in there to NOT use it.
        </T>
        <T>
          Finally, there's regulation risk. Stablecoin issuers often operate
          with the approval of a government. In 1930, the United States
          government seized all the gold because people were fleeing the dollar.
          Yeah, they didn't teach you that in school, did they?
        </T>
        <Heading>Choose WETH/X pairs (or MATIC/X, BNB/X)</Heading>
        <T>
          Crypto tends to move together, just like the stock market. If BTC is
          going up, ETH is probably going up too. This means you can have high
          swap volume with fewer rebalances as crypto tends to be correlated
          with itself. The best pairs will include the base currency of the
          chain (ETH, BNB, MATIC) because those will be the most used and most
          liquid.
        </T>
        <T>
          Uniswap created an amazing tool with V3, giving users better swaps
          with lower fees. While Uniswap V3 gives more tools to liquidity
          providers, it also increases the difficulty over V2. I created
          TidePools.io to solve my own problem: how can I put my crypto to work
          for me, generating max rewards with less risk?{" "}
          <ExternalLink href="/pools">Try it out</ExternalLink>.
        </T>
        <T>
          Have a question that wasn't answered here? Let me know on{" "}
          <ExternalLink
            href="https://twitter.com/JuanSanchez0x0"
            target="_blank"
          >
            Twitter!
          </ExternalLink>
        </T>
      </Container>
    </Box>
  )
}

export default HowToProvidLiquidity
