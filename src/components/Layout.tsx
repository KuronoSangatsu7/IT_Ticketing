import { currentUserAtom } from "@/store/store"
import { Grid, GridItem } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import SideBar from "./SideBar/SideBar"
import SignInForm from "./SignInButton"
import SignInMessage from "./SignInMessage"

export default function Layout({ children }: { children: React.ReactNode }) {
	const [currentUser] = useAtom(currentUserAtom)
	const router = useRouter()

	return (
		<Grid
			templateAreas={{
				base: `
				"nav"
				"main"`,
				md: `
				"nav main"`,
			}}
			gridTemplateColumns={{ base: "auto", md: "80px 1fr" }}
			gridTemplateRows={{ base: "65px 1fr", md: "auto" }}
			as="main"
			h="100vh"
			bg="backgroundGray"
		>
			<GridItem
				sx={{
					"::-webkit-scrollbar": {
						display: "none",
					},
				}}
				area="main"
				h="95%"
				w="95%"
				alignSelf="center"
				borderRadius="xl"
				justifySelf="center"
				boxShadow="gray"
				display="flex"
				justifyContent="center"
				overflow="scroll"
			>
				{currentUser ? (
					children
				) : router.pathname == "/" ? (
					children
				) : (
					<SignInMessage />
				)}
			</GridItem>
			<GridItem area="nav">
				<SideBar />
			</GridItem>
		</Grid>
	)
}
