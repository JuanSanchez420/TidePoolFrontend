import { useState, useContext, useMemo } from "react"
import { Global } from "../context/GlobalContext"
import { Flex, Box, Heading, Text, Grid } from "../components"
import theme from "../info/theme"
import { Search } from "../components/Icons"
import { TextInput } from "../components/Input"
import { Card } from "../components/Card"
import NetworkSelect from "../components/NetworkSelect"
import Link from "next/link"
import styled from "styled-components"

const CreateLink = styled(Link)`
  color: white;
`

const StyledGrid = styled(Grid)`
  grid-template-columns: 1fr;
  gap: 5px;
  max-width: 1000px;
  margin: auto;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`

const List = () => {
  const [open, setOpen] = useState(false)
  const { theList, network } = useContext(Global)
  const [search, setSearch] = useState("")

  const view = useMemo(() => {
    if (search === "") return theList.tidePools

    return (
      theList.tidePools.filter(
        (tp) =>
          (tp.pool.token0.symbol || "")
            .toLowerCase()
            .indexOf(search.toLowerCase()) >= 0 ||
          (tp.pool.token1.symbol || "")
            .toLowerCase()
            .indexOf(search.toLowerCase()) >= 0 ||
          tp.pool.token0.address === search ||
          tp.pool.token1.address === search ||
          tp.address === search
      ) || []
    )
  }, [search, theList])

  const pools = useMemo(
    () =>
      view.map((c) => (
        <Card
          key={c.address}
          tidePool={c}
          apr={0}
          balance={undefined}
          totalSupply={undefined}
          lastRebalance={undefined}
          position={undefined}
          estimatedPosition={undefined}
        />
      )),
    [view]
  )

  return (
    <Box p="1rem" width="100%">
      <Box maxWidth="1000px" mx="auto">
        <Heading>TidePools</Heading>
        <Text mb="1rem" color={theme.colors.white}>
          Start earning passive crypto income with our automated V3 liquidity
          pools.
        </Text>
        <Text mb="1rem" color={theme.colors.white}>
          Don't see your favorite pool?{" "}
          <CreateLink href="/create" color={theme.colors.white}>
            Create it!
          </CreateLink>
        </Text>
      </Box>
      <Flex mb="1rem" maxWidth="400px" mx="auto">
        <NetworkSelect open={open} setOpen={setOpen} network={network} />
        <TextInput
          value={search}
          setValue={setSearch}
          icon={<Search height="2rem" width="2rem" color="white" />}
        />
      </Flex>
      <StyledGrid>{pools}</StyledGrid>
    </Box>
  )
}

export default List
