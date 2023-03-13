import { Grid, GridItem } from "@chakra-ui/react"
import SideBar from "./SideBar/SideBar"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Grid
			templateAreas={`"header header"
					"nav main"
					"nav main"`}
			gridTemplateRows={"50px 1fr"}
			gridTemplateColumns={"300px 1fr"}
			gap="1"
			as='main'
			h="100%"
		>
			<GridItem area="header">Header</GridItem>
			<GridItem area="main">{children}</GridItem>
			<GridItem area="nav">
				<SideBar />
			</GridItem>
		</Grid>
	)
}
