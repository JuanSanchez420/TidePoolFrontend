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

const H2 = styled.h2`
  color: ${({ theme }) => theme.colors.yellow};
  margin: 0;
  padding: 0;
  font-weight: 700;
`

const CaseStudies = () => {
  return (
    <Box mx="auto" width="100%">
      <Container>
        <Heading>CASE STUDIES: Providing Liquidity on Uniswap V3</Heading>
        <T>
          I wanted to answer the following questions about Uniswap V3 Liquidity
          Providing:
        </T>
        <StyledUL>
          <li>
            <ExternalLink href="/case-studies#Rebalance">
              How often should we rebalance?
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="/case-studies#Ranges">
              How wide should the ranges be?
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="/case-studies#WETHX">
              What are the returns like for WETH/stable vs WETH/ERC20?
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="/case-studies#BullBear">
              How does providing liquidity perform during a bull vs a bear?
            </ExternalLink>
          </li>
        </StyledUL>
        <T>
          Uniswap V3 introduced "concentrated liquidity" where users can supply
          liquidity in a narrow band to increase their reward generation. But
          how narrow of a band do we want to make? How often do we want to
          rebalance?
        </T>
        <T>
          To answer these questions, I ran several experiements as well as
          looked at competitors running Uniswap V3 optimizers as well. Note: I
          don't want to name and shame them so they'll be listed as "Competitors
          #1/#2", but if you look around you could see who I'm referring to.
        </T>
        <T>
          (
          <ExternalLink href="/case-studies#Summary">
            Skip to summary bullet points
          </ExternalLink>
          )
        </T>
        <a id="Rebalance" />
        <H2>How often to rebalance: daily vs weekly vs monthly+?</H2>
        <T>
          We only earn rewards on the position when prices moves within the
          range. If price doesn't move, we don't get rewards. If price moves out
          of the range right away, we pay swap fees as well as not generating
          rewards (ick!). We need to pick a timeframe that's long enough to
          generate rewards, but short enough to get max rewards.
        </T>
        <T>Results of WETH/stable pairs rebalancing frequency:</T>
        <StyledUL>
          <li>Daily: -5.6% APR</li>
          <li>Weekly: 40 to 69% APR</li>
          <li>Monthly+: 6% APR and 13% APR</li>
        </StyledUL>
        <T>
          Daily rebalancing was an absolute disaster: we LOST money by providing
          liquidity! I deposited $26,659 and withdrew $25,741 after 223 days
          (~7.5 months). Gross! WETH price was almost identical for both deposit
          and withdraw, which should've been perfect to avoid impermanent loss.
        </T>
        <T>
          How could APR go negative when the ranges were tight and we were
          earning all those rewards? Swap fees, slippage, and impermanent loss.
          Even though the pool was the lowest fee pool possible at 0.05%, the
          rebalancing was too active for the rewards generated. Impermanent loss
          was likely the real killer. Remember that offering liquidity means you
          take the BAD side of every trade! The rewards generated have to be
          good enough to overcome this.
        </T>
        <T>
          Weekly rebalancing seems to be the sweet spot: 40% to 69% APRs! Both
          WETH/USDT and WETH/GMX tested confidently positive when weekly
          rebalances.
        </T>
        <T>
          Competitor #1 and Competitor #2 both rebalance on a monthly schedule
          (or greater). The rewards generated are available on their
          applications and they look correct to me: 13% APR for #1, and 6% APR
          for #2. Frankly, those rewards are too low when considering the risks
          of impermanent loss.
        </T>
        <T>
          The daily rebalancing test was run on{" "}
          <ExternalLink href="https://arbiscan.io/address/0xf6657505422C321737D4239092A4Ed0509eD82dc">
            this contract
          </ExternalLink>
          .
        </T>
        <T>Conclusion: weekly or bi-weekly rebalancing works best.</T>
        <a id="Ranges" />
        <H2>How wide to keep the ranges?</H2>
        <T>
          The distance between the lower and upper limits of liquidity providing
          is related to how often you need to rebalance, but it's a little
          different. If the range is too narrow for the time period, you need to
          rebalance more frequently or sit out of range. If the range is too
          wide, there's too little rewards generated.
        </T>
        <T>
          TidePools is unique because it adjusts the range based on weekly
          volatility. If the pair is volatile, the range increases. If it's a
          quiet pair, the range decreases. It does this all on its own. You can
          read more about{" "}
          <ExternalLink href="/how-it-works">How TidePools Works</ExternalLink>.
        </T>

        <T>Current WETH / stable price: $1,910 (5/7/23)</T>
        <StyledUL>
          <li>
            TidePools.io WETH/USDT 0.05% fee. range: $1,722 - $2,051, 66% APR
            (17.5% price range)
          </li>
          <li>
            Competitor #1 WETH/USDC 0.3% fee. range: $1,350 - $2,790, 13% APR,
            (206% price range)
          </li>
          <li>
            Competitor #2 WETH/DAI 0.05% fee. range: $483 - $4,902, 6% APR,
            (1,014% price range)
          </li>
        </StyledUL>
        <T>
          Because TidePools keeps a tighter range, we can generate more reward
          APR. Both competitors have much wider ranges, which means lower reward
          generation. But as a positive, a wider range means less impermanent
          loss! You can read the pros and cons of wide vs narrow ranges here.
        </T>
        <T>
          Competitor #1 sets their ranges manually, so I don't know what their
          thought process is behind this range.
        </T>
        <T>
          Competitor #2 looks absolutely lazy to me, uninterested in making
          money for their users. WETH/stable hasn't been at $483 in years, and
          has never been as high as $4,902. They have never even run a rebalance
          on their pool in over a year. They're not even trying.
        </T>
        <T>
          Conclusion: sub 100% price ranges are necessary to generate enough
          rewards. For example, if price is $100, the range should be narrower
          than $50 to $200.
        </T>
        <a id="WETHX" />
        <H2>What are the returns like for WETH/ERC20 pairs?</H2>
        <T>
          We've talked a lot about WETH/stable pairs because they're the most
          traded. But WETH/X pairs (or MATIC/X, OP/X, BNB/X) are often used as
          bridge pairs if a direct pair doesn't exist. For example, if a user
          wants to swap token A for token B but no A/B pool exists, the swap
          will often go through the WETH/A and WETH/B pools so the swap still
          happens.
        </T>
        <T>
          I started by depositing $25,063 worth of WETH/GMX, and withdrew
          $29,952 worth of WETH/GMX just 42 days later! Price did increase on
          both WETH and GMX over USD by 14% and 8% respectively, so we can say
          price increase on the pair rose by a blended 11%. This gives us value
          of $27,920, which means $2,031 worth of value came from generated
          rewards over this time period which is 69% APR! (nice)
        </T>
        <T>
          WETH/X pairs are also great because crypto tends to move together. If
          ETH is going up against fiat, BTC probably is too. This means we can
          have tighter ranges and generate more rewards. The current TidePool
          for WETH/GMX has a 15% wide price range vs the 17.5% price range on
          WETH/USDT.
        </T>
        <T>
          The transactions for this study can be found on{" "}
          <ExternalLink href="https://arbiscan.io/address/0x66de270719f5ece3dd979bbed85ba08a71011880">
            this contract
          </ExternalLink>
          .
        </T>
        <T>
          Conclusion: WETH/X pairs have been the highest performers so far,
          provided the pair has enough volume.
        </T>
        <a id="BullBear" />
        <H2>Case study #2 on WETH/USDT: the bull and the bear</H2>
        <T>
          We deposited $32,851 worth of WETH on 3/28/23, and have $34,505 worth
          in the position [as of this writing] (5/7/23). WETH/USDT had some ups
          and downs during this time period, starting at a price of $1,719,
          spiking to a high of $2,097, and settling at the current [as of this
          writing] $1,910. The position made a nominal $1,654 from the start,
          for a 40% APR and a 5% gain on the position.
        </T>
        <T>
          However, didn't those realized 5% nominal gains underperform the 11%
          price increase of WETH over USDT? Yes. Liquidity providing will
          underperform price in bull markets, and overperform price in bear
          markets. The rebalance on 4/14/2023 had a total value of $34,563 when
          WETH/USDT was $2,097. Price decreased from $2,097 to the current
          $1,910, a -9% drop. However, the total value of the position only lost
          -2.3%: we outperformed the market during the dump.
        </T>
        <T>
          If you're really bullish on an asset, it's probably best to hold that
          asset directly. If you're unsure about price or want to protect your
          downside, providing liquidity is an excellent choice.
        </T>
        <T>
          The transactions for this study can be found on{" "}
          <ExternalLink href="https://arbiscan.io/address/0x46BBee855Ad10215AB853FA3847aD3988130535F">
            this contract
          </ExternalLink>
          .
        </T>
        <T>
          Conclusion: liquidity providing will underperform price in bull
          markets, and overperform price in bear markets.
        </T>
        <a id="Summary" />
        <H2>Summary</H2>
        <StyledUL>
          <li>
            Daily rebalancing loses money due to fees, slippage, and impermanent
            loss
          </li>
          <li>Weekly or Bi-weekly rebalancing looks best</li>
          <li>Monthly+ rebalancing doesn't generate any fees</li>
          <li>
            Wide price ranges from half to double current price are unlikely to
            generate meaningful rewards
          </li>
          <li>
            WETH/X pairs can generate equal or more rewards than just
            WETH/stable
          </li>
          <li>
            Providing liquidity underperforms bull markets, but overperforms
            bear markets
          </li>
        </StyledUL>
        <T>With these studies, we can show returns of 40-69% on TidePools managed liquidity positions!</T>
        <T>
          TidePools has a "Live APR" on each pool with an active position to
          show you the real returns. Of course, actual returns may vary due to{" "}
          <ExternalLink href="/what-is-impermanent-loss">
            impermanent loss
          </ExternalLink>{" "}
          and other factors such as{" "}
          <ExternalLink href="/how-to-provide-liquidity-profitably">
            swap volume
          </ExternalLink>
          , but we've done many studies and tests to show your we're profitable
          and safe for your crypto.
        </T>
        <T>
          Farming with TidePools is easy.{` `}
          <ExternalLink href="https://twitter.com/pools">
            Just pick your pool
          </ExternalLink>
          , deposit, and generate rewards on your crypto. If you don't see the
          pool you want, you can{" "}
          <ExternalLink href="https://twitter.com/create">
            create your own
          </ExternalLink>{" "}
          in seconds!
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

export default CaseStudies
