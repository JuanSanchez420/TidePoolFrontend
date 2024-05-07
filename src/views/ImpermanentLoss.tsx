import { Box, Flex, Text, Heading } from "../components"
import styled from "styled-components"

const ExternalLink = styled.a`
  color: white;
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

const ImpermanentLoss = () => {
  return (
    <Box mx="auto" width="100%">
      <Container>
        <Heading>What is impermanent loss?</Heading>
        <T>
          I'm going give simple answers to a hard problem, because not all of us
          are math nerds! I'll also give some advice for avoiding impermanent
          loss.
        </T>

        <T>
          The unhelpful technical definition is "impermanent loss is the
          difference between staking assets in a liquidity pool versus holding
          the assets".
        </T>
        <T>
          My simpler definition: "impermanent loss is when you get the same
          AMOUNT of stuff back, but it's not the same VALUE". 1 bottle of water
          in the desert is the same AMOUNT as 1 bottle of water at home, but
          they have different VALUES. That bottle of water in the desert is
          worth way more.
        </T>
        <Heading>Pun intended liquidity providing examples</Heading>
        <T>
          In both examples, you start the day with $5 and 5 bottles of water. 1
          bottle of water costs $1.
        </T>
        <T>
          Example one: it's a hot day at the beach, and you're playing
          volleyball in the sand with some friends. They are thirsty, and offer
          to buy your bottles of water for $1 each. You sell all 5 bottles of
          water, now having $10 in your pocket. But after a while... you're
          thirsty too. And now you don't have water! Each friend who gave you a
          dollar for a bottle of water made a fair trade, and you ended the day
          with the same amount of assets. But the value of water changed. The
          $10 in your pocket doesn't solve your thirst problem. This is
          impermanent loss: the bottles of water are now worth more than the
          money.
        </T>
        <T>
          Example two: after your day at the beach, you see a money making
          opportunity. You go to the store and buy 5 bottles of water for $1
          each, bringing your total to 10 bottles of water. You head to the
          beach to sell them, but... it's raining. No one wants to buy your
          water. You have the same AMOUNT of stuff you started the day with, but
          the VALUE changed.
        </T>
        <T>
          By providing liquidity, you're taking the bad side of every trade. If
          you're providing liquidity on WETH / USDC and ETH is rising, you'd be
          better of holding ETH. If crypto is dumping, you'd be better off
          holding stables. So why provide liquidity? Because we can earn fees
          with every trade!
        </T>
        <T>
          The dream is for price to remain constant so you can collect fees
          forever without experiencing impermanent loss. And it's just that: a
          dream. Let's look at real world scenarios to maximize fees while
          minimizing impermanent loss.
        </T>
        <Heading>Scenario one: Full, or wide range liquidity</Heading>
        <T>
          The older verions of Uniswap and clones (Sushi, Pancake, Joe, Spooky,
          etc) have simple liquidity providing across the entire range: from 0
          to infinity. These actually work really well! V2 pools, on average,
          are more likely to be profitable than V3 pools even though they
          generate less fees. This is possible because they prevent users from
          self harm by impermanent loss. We can act like a V2 pool by selecting
          a full range on our V3 pools.
        </T>
        <T>
          We can improve on full range liquidity by narrowing the range
          somewhat. We'll still have a wide range, but not from 0 to infinity.
          Instead, try to pick a range that is likely to last several weeks or
          months. How? Look at how much price moved in the previous
          weeks/months, and create a range that is roughly that wide. If
          ETH/USDT moved $1000 in price, over the past month, simply create a
          range +-$500. Keep it simple! You're now generating increased rewards
          on your crypto while minimizing impermanent loss.
        </T>
        <Heading>Scenario two: correlated assets</Heading>
        <T>
          There are several types of assets that move together: WETH/X pairs,
          stable/stable pairs, and wrapped assets like staked ETH.
        </T>
        <T>
          Staking stable/stable pairs is easy to understand. Since USDC and USDT
          are both pegged to be equal to $1, in theory we could stake in a tiny
          range collect fees without rebalancing. That theory holds up well, but
          so many people do this that the rewards generated are low.
        </T>
        <T>
          WETH/X pairs are an interesting example. Crypto tends to move
          together. If BTC goes up against fiat, ETH does too. If ETH goes down
          against fiat, BTC does too. Thus, the values of ETH vs BTC don't
          change much. We can stake something like ETH/BTC and generate rewards
          with minimal impermanent loss while being short fiat!
        </T>
        <T>
          Last, there are wrapped assets like staked ETH that should be similar
          in value to regular ETH. We can stake these in a small range and
          theoretically avoid impermanent loss.
        </T>
        <Heading>Scenario three: don't</Heading>
        <T>
          In wild markets where an asset is making new all time highs/lows, it
          can be better to not provide liquidity. There have been several times
          in crypto's history when markets have broken down. BitMex had to pause
          trading in 2018 to prevent BTC from going to 0. Stablecoins went to
          actual zero. Exchanges went down. During these times, it's usually
          best to get out of the market.
        </T>
        <T>
          Those are some strategies to prevent impermanent loss. Too much to
          handle? Don't worry: TidePools.io does all of this automatically for
          you!{" "}
          <ExternalLink href="https://twitter.com/pools">
            Just pick your pool
          </ExternalLink>
          , deposit, and generate rewards on your crypto. If you don't see the
          pool you want, you can{" "}
          <ExternalLink href="https://twitter.com/pools">
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

export default ImpermanentLoss
