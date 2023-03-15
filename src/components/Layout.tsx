import { Grid, GridItem } from "@chakra-ui/react"
import { SearchBar } from "./SearchBar"
import SideBar from "./SideBar/SideBar"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Grid
			templateAreas={`
					"nav main"
					"nav main"`}
			gridTemplateColumns={"80px 1fr"}
			as="main"
			h="100vh"
		>
			<GridItem area="main">{children}</GridItem>
			<GridItem area="nav">
				<SideBar />
			</GridItem>
		</Grid>
	)
}
