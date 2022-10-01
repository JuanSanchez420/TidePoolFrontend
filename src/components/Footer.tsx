import React from "react"
import styled from "styled-components"
import { Flex, UnorderedList } from "./index"
import { Link } from "react-router-dom"

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
      <Flex flex="1 1 auto">
        <a href="/">
          <TidePoolLogo src="/images/DarkLogoWithTaglineHorizontal.png" />
        </a>
      </Flex>
      <Flex justifyContent="center" flex="5">
        <UnorderedList>
          <li>
            <MenuLink to="/">Home</MenuLink>
          </li>
          <li>
            <MenuLink to="/pools">TidePools</MenuLink>
          </li>
        </UnorderedList>
        <UnorderedList>
          <li>
            <MenuLink to="/create">Create</MenuLink>
          </li>
          <li>
            <MenuLink to="/faq">FAQ</MenuLink>
          </li>
        </UnorderedList>
      </Flex>
    </Flex>
  )
}
