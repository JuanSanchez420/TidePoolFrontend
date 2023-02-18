import React from "react"
import styled from "styled-components"
import { Flex, UnorderedList, Box } from "./index"
import Link from "next/link"

const TidePoolLogo = styled.img`
  height: 4rem;
`

const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`

export const Footer = () => {
  return (
    <Flex py="1rem" px="0.5rem" alignItems="center" flexShrink="0">
      <Box display={["none", "block"]}>
        <Flex flex="1 1 auto">
          <a href="/">
            <TidePoolLogo src="/images/TidePoolsDarkLogoNoTagline.svg" />
          </a>
        </Flex>
      </Box>
      <Flex justifyContent="center" flex="5">
        <UnorderedList>
          <li>
            <MenuLink href="/">Home</MenuLink>
          </li>
          <li>
            <MenuLink href="/pools">TidePools</MenuLink>
          </li>
        </UnorderedList>
        <UnorderedList>
          <li>
            <MenuLink href="/create">Create</MenuLink>
          </li>
          <li>
            <MenuLink href="/faq">FAQ</MenuLink>
          </li>
        </UnorderedList>
      </Flex>
    </Flex>
  )
}
