import { alertStateAtom, currentUserAtom } from "@/store/store"
import { Alert, AlertIcon, Grid, GridItem, Portal } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import LoadingSpinner from "./LoadingSpinner"
import SideBar from "../SideBar/SideBar"
import SignInMessage from "../Messages/SignInMessage"

export default function Layout({ children }: { children: React.ReactNode }) {
	const [currentUser] = useAtom(currentUserAtom)
	const [alertState] = useAtom(alertStateAtom)
	const router = useRouter()

	let content: React.ReactNode = <LoadingSpinner />

	currentUser === false && (content = <SignInMessage />)

	currentUser == false && router.pathname == "/" && (content = children)

	currentUser && (content = children)

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
			<Alert
				display={alertState.visible == true ? "flex" : "none"}
				position="fixed"
				justifySelf="center"
				top={{ base: "75px", md: "40px" }}
				w={{ base: "60%", md: "25%" }}
				status={alertState.status}
				borderRadius="2xl"
				zIndex="10"
			>
				<AlertIcon />
				{alertState.text}
			</Alert>
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
				{content}
			</GridItem>
			<GridItem area="nav">
				<SideBar />
			</GridItem>
		</Grid>
	)
}
