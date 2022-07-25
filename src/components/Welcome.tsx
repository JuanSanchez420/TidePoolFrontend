import React from "react";
import { Box, Button, Text, StyledLink } from "../components";
import useLocalStorage from "../hooks/useLocalStorage";
import styled from "styled-components";
import { External } from "../components/Icons";

const Container = styled(Box)`
  margin-bottom: 1rem;
  background: white;
  padding: 10px;
  border-radius: 0.5rem;
  width: fit-content;
  max-width: 1000px;
`;

const ExternalLink = styled(StyledLink)`
  background-color: ${(props) => props.theme.colors.lightBlue};
  padding: 0.1rem;
`;

const WelcomeMessage = ({ callback }: { callback: () => void }) => {
  return (
    <Box width="100%">
      <Text fontWeight="700" fontSize="x-large" my="1rem" textAlign="center">
        Welcome to TidePools.io!
      </Text>
      <Text mb="1rem">
        TidePools.io generates the largest returns on Uniswap V3 liquidity
        pools, passively! Just deposit in a TidePool, and we take care of the
        rest.
      </Text>
      <Text mb="1rem">TidePools.io:</Text>
      <Box>
        <ul>
          <li>Manages your pools for you</li>
          <li>Maximizes fee generation</li>
          <li>Pays all the gas costs</li>
        </ul>
      </Box>
      <Text my="0.5rem">
        Basically, TidePools.io turns a V3 liqudity pool into a hassle-free V2
        liquidity pool.
      </Text>
      <Text my="0.5rem">
        Don't see a pool you want?{" "}
        <ExternalLink href="/create">Create it!</ExternalLink> We allow users to
        create their own TidePools for any Uniswap V3 pool they want.
      </Text>
      <Text my="0.5rem">
        Have questions? Check out our{" "}
        <ExternalLink href="/faq">FAQ</ExternalLink>, or{" "}
        <ExternalLink href="https://twitter.com/juansanchez0x0">
          talk to me on Twitter <External height="1rem" width="1rem" />
        </ExternalLink>
        .
      </Text>
      <Text my="0.5rem" fontWeight="800">
        THIS PRODUCT IS IN BETA!
      </Text>
      <Text my="0.5rem">
        While the contracts have been finalized, tested, and security checked,
        the website is still a work in progress.
      </Text>
      <Text my="0.5rem">
        All of this information can be found in the menu above.
      </Text>
      <ShowHideButton onClick={() => callback()}>Got it!</ShowHideButton>
    </Box>
  );
};

const ShowHideButton = styled(Button)`
  padding: 10px;
`;

const Welcome = () => {
  const [hideWelcome, setHideWelcome] = useLocalStorage("hideWelcome");

  const toggle = () => {
    setHideWelcome(!hideWelcome);
  };

  return !hideWelcome ? (
    <Container>
      <WelcomeMessage callback={() => toggle()} />
    </Container>
  ) : null;
};

export default Welcome;
