import styled from "styled-components"
import { Flex, Box, Text } from "./index"
import { Hamburger } from "./Icons"
import Link from "next/link"

const Menu = styled(Box)`
  border-radius: 0.5rem;
  padding: 5px 10px;
  text-transform: none;
  position: relative;
  z-index: 12;

  :hover {
    cursor: pointer;
  }

  :hover #menu {
    visibility: visible;
    transition-delay: 0s;
  }
`

const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;
`

const MenuOptions = styled(Flex)`
  visibility: hidden;
  transition: 0.2s 1s;
  width: 150px;
  position: absolute;
  right: 0;
  top: 3rem;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.buttonText};
  filter: ${({ theme }) => theme.utils.dropShadow};
  z-index: 11;
`

const Highlight = styled(Text)`
  width: 100%;
  :hover {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    border-radius: 1rem;
    span {
      visibility: visible;
    }
  }
`

const RedDot = styled.span`
  visibility: hidden;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.red};
  height: 5px;
  width: 5px;
`

interface Page {
  url: string
  title: string
}

const pages: Page[] = [
  { url: "/", title: "Home" },
  { url: "/pools", title: "TidePools" },
  { url: "/how-it-works", title: "How It Works" },
  { url: "/case-studies", title: "Case Studies" },
  { url: "/create", title: "Create" },
  { url: "/faq", title: "FAQ" },
]

const HamburgerMenu = () => {
  return (
    <Menu>
      <Hamburger height={"2.5rem"} color={"#FFF"} />
      <MenuOptions
        id="menu"
        flexDirection="column"
        alignItems="start"
        justifyContent="start"
      >
        {pages.map((p) => (
          <Highlight key={`highlight-${p.title}`}>
            <MenuLink href={p.url}>
            <Flex
              key={p.title}
              alignItems="center"
              justifyContent="space-between"
              py="2px"
              px="10px"
            >
              {p.title}
              <RedDot />
            </Flex>
            </MenuLink>
          </Highlight>
        ))}
      </MenuOptions>
    </Menu>
  )
}

export default HamburgerMenu
