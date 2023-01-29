import { useState, useContext, useMemo } from "react"
import { Global } from "../context/GlobalContext"
import { Flex, Box, Heading, Text } from "../components"
import theme from "../info/theme"
import { Search } from "../components/Icons"
import { TextInput } from "../components/Input"
import { Card } from "../components/Card"
import NetworkSelect from "../components/NetworkSelect"
import { Link } from "react-router-dom"
import styled from "styled-components"

const CreateLink = styled(Link)`
  color: white;
`

const List = () => {
  const [open, setOpen] = useState(false)
  const { theList } = useContext(Global)
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
  }, [search, theList.tidePools])

  return (
    <Box p="1rem">
      <Heading>TidePools</Heading>
      <Text mb="1rem" color={theme.colors.white}>
        Start earning passive crypto income with our automated V3 liquidity
        pools.
      </Text>
      <Text mb="1rem" color={theme.colors.white}>
        Don't see your favorite pool?{" "}
        <CreateLink to="/create" color={theme.colors.white}>
          Create it!
        </CreateLink>
      </Text>
      <Flex mb="1rem" maxWidth="400px" mx="auto">
        <NetworkSelect open={open} setOpen={setOpen} />
        <TextInput
          value={search}
          setValue={setSearch}
          icon={<Search height="2rem" width="2rem" color="white" />}
        />
      </Flex>
      {view.map((c) => (
        <Card key={c.address} tidePool={c} pool={undefined} apr={0} balance={undefined} position={undefined} />
      ))}
    </Box>
  )
}

export default List
