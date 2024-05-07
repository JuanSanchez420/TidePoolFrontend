import React from "react"
import styled from "styled-components"
import { Flex } from "./index"
import Link from "next/link"
import TidePoolsDarkLogoNoTagline from "../components/svg/TidePoolsDarkLogoNoTagline"

const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`

export const UnorderedList = styled.ul`
  color: ${({ theme }) => theme.colors.white};
  list-style-type: none;
`

export const Footer = () => {
  return (
    <Flex py="1rem" px="0.5rem" alignItems="center" flexShrink="0">
      <Flex flex="1 1 auto">
        <Link href="/">
          <TidePoolsDarkLogoNoTagline height="4rem" width="100%" />
        </Link>
      </Flex>
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
