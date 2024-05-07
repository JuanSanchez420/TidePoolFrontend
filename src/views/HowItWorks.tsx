import { Box, Flex, Text, Heading } from "../components"
import styled from "styled-components"
import theme from "../info/theme"

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
  color: white;
`

const H2 = styled(Text)`
  margin-top: 1rem;
  color: ${theme.colors.yellow};
  font-weight: 700;
`

const HowItWorks = () => {
  return (
    <Box mx="auto" width="100%">
      <Container>
        <Heading>How TidePools Works</Heading>
        <T>
          When a user makes a swap on Uniswap, a tiny fee is taken out of the
          trade. These fees are given to people who make swapping possible, like
          you. We can create strategies to collect as many of these fees as
          possible.
        </T>
        <T>
          TidePools.io manages your Uniswap V3 liquidity pools for you to get
          the best possible returns. (
          <ExternalLink href="/how-it-works#technical">
            skip to technical version
          </ExternalLink>
          )
        </T>
        <H2>TidePools.io makes sure your crypto is always working for you.</H2>
        <T>
          Normal Uniswap V3 positions need constant babysitting in case price
          moves out of your range and you stop earning fees. Not with
          TidePools.io - We adjust your position for you!
        </T>
        <H2>
          TidePools.io adjusts each position when necessary to maximize returns.
        </H2>
        <T>
          As volatility grows, the price range of the position widens to keep
          profit generation high while at the same time reducing swapping fees.
          As volality shrinks, the price range of the position narrows to keep
          profit generation high. And all of this happens automatically with no
          input from you!
        </T>
        <H2>Depositing in a TidePool is easy.</H2>
        <T>
          You can deposit with either tokenA and tokenB or just one of the
          tokens. If you want to be in the WETH/USDC pool but only have USDC, no
          problem! Just approve & deposit USDC and tidepool will do the rest.
          When you withdraw, you'll get a mix of WETH and USDC equivalent to the
          value you put in.
        </T>
        <T>That's it! We want to make this as easy as possible.</T>
      </Container>
      <Container>
        <a id="technical" />
        <Heading>Technical Version</Heading>
        <H2>TidePools.io uses a keeper (bot) to monitor every tidepool.</H2>
        <T>
          It makes sure the position is always in range by watching the
          needsRebalance() function. If the position is out-of-range, a
          Rebalance will occur. Anyone can call the rebalance() function, which
          is only available if 7 days have passed or the position is
          out-of-range. This means that the contracts will always be available
          for use, forever!
        </T>
        <T>
          Every tidepool created verifies a valid Uniswap V3 pool with the
          Uniswap factory contract. There's no way to create a fake/scam
          tidepool.
        </T>
        <H2>Each tidepool starts with a range of 20, 60, or 200 ticks.</H2>
        <T>
          Tick width (percent difference in price) will be different for each
          fee tier: 0.1%, 0.6%, or 2%. Starting width for a pool with 0.05% fee
          will have a starting range of +-10% price. Starting width for a pool
          with a 0.3% fee will have a starting range of +-13% price. Starting
          width for a pool with a 1% fee will have a starting range of +-20%
          price.
        </T>
        <H2>
          It doesn't matter that the starting ranges are different percentages
          of price because the tidepools adjust with volatility.
        </H2>
        <T>
          Less volatile pairs will automatically have smaller ranges, while
          volatile pairs will have large ranges no matter their fee tier. The
          goal is to rebalance() roughly once per week. This makes sure the
          pools constantly adjust for changing market conditions. The pools will
          rebalance as often as they need to stay in range.
        </T>
        <H2>When the rebalance() function runs, one of two things happens:</H2>
        <T>
          If the position is in-range: Liquidity is removed. The width of the
          range will shrink by 1 tick. The keeper will swap to a 50/50 position
          with a maximum of 1% slippage. If the 1% slippage is hit, the keeper
          will stop swapping and there'll be unused balance on the contract
          until the next rebalance(). Liquidity is minted in the new range. This
          makes sure that the position gets more concentrated for maximum fees
          as volatility drops!
        </T>
        <T>
          If the position is out-of-range: Liqudity is removed. The width of the
          range will increase by 10 ticks. The keeper will swap to a 50/50
          position with a maximum of 1% slippage. If the 1% slippage is hit, the
          keeper will stop swapping and there'll be unused balance on the
          contract until the next rebalance(). Liquidity is minted in the new
          range. Increasing the range with volatility means we swap less often,
          reducing fees & slippage while maintaining maximum fee generation!
        </T>
        <H2>
          Newly created tidepools may rebalance() several times in the first few
          days as they find optimal volatility settings.
        </H2>
        <T>
          Mature tidepools will rebalance() a little more than once per week.
          Some tidepools will have ranges wider than 50% of price due to high
          volatility, while others will stay in tight ranges forever. It's all
          automatic!
        </T>
        <H2>Deposits can use any amount of either/both token0 and token1.</H2>
        <T>
          Withdraws are given in the proportions of the tidepool position, which
          can vary from 1%/99% to 99%/1% token0/token1.
        </T>
        <T>
          Rewards are automatically harvested and compounded back into the
          position! Compounding happens with every rebalance, deposit, or
          withdraw.
        </T>
        <T>
          TidePools.io takes 5% of the profit to pay the gas costs of the keeper
          running rebalance(), frontend improvements/hosting, and advertising.
        </T>
        <H2>
          Volatility protection: Tidepools rebalance() off the Uniswap pool
        </H2>
        <T>
          In volatile markets, that's a huge slippage risk! TidePools.io force a
          maximum of 1% slippage on each rebalance(). Uniswap pools have a "swap
          until X slippage is met" feature that we use. If we hit the slippage
          limit, the tidepool stops swapping. The tidepool will do its best to
          stay active, but will sit out with the majority of the position in
          extreme volatility. When volatility goes back to normal levels, the
          tidepool will re-mint the position. In addition, the widening range
          makes sure we don't swap too often so we save on fees/slippage.
        </T>
        <H2>MEV protection</H2>
        <T>
          Since the tidepools rebalance() once per week, could someone uses a
          flash loan manipulate the pool to take 1% slippage from us? No, they
          would be eaten alive in both trading fees and slippage of their own if
          they wanted to try this. The economics aren't worth it for them. MEV
          bots look for juicier targets, like when someone allows 50% slippage
          on big trades.
        </T>
        <H2>Security</H2>
        <T>
          TidePools.io doesn't have any special permissions. I can't change the
          contracts in any way or call any function you can't. This prevents me
          from getting hacked and losing the governance permissions, and it also
          means that if the contracts were hacked they can't do anything either.
          TidePools.io only creates pools off the official Uniswap V3 contract
          to prevent bad pool creation. I have war-gamed out scenarios to try
          and prevent economic exploits such as MEV, and rewards are
          automatically distributed before a user deposits so someone can't
          flash deposit to steal them (the Popsicle Finance exploit).
        </T>
        <H2>
          TidePools.io contracts were audited with Slither and MythX, no
          security holes were found.
        </H2>
        <T>
          Why not any audits by [Well Known Audit Company]? I've used them many
          times, and they couldn't find the sun on a clear day. If any
          hacks/exploits are found, tidepools will be withdraw only on the
          frontend and I'll do my best to make users whole.{" "}
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

export default HowItWorks
