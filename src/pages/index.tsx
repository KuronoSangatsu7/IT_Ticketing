import LoadingSpinner from "@/components/LoadingSpinner"
import SignInButton from "@/components/SignInButton"
import { currentUserAtom } from "@/store/store"
import { Box, Flex } from "@chakra-ui/react"
import { useAtom } from "jotai"
import Head from "next/head"

export default function Home() {
	const [currentUser] = useAtom(currentUserAtom)

	let content = <LoadingSpinner marginTop="200px" />

	currentUser === false &&
		(content = (
			<>
				<Box as="span" fontSize="4xl" py="200px">
					Welcome to IT Ticketing!
				</Box>
				<SignInButton />
			</>
		))

	currentUser &&
		(content = (
			<Box as="span" fontSize="4xl" py="200px">
				Welcome to IT Ticketing!
			</Box>
		))

	return (
		<>
			<Head>
				<title>IT Ticketing</title>
				<meta
					name="description"
					content="Manage your all your IT department's needs on one simple, easy-to-use platform"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta property="og:title" content="IT Ticketing" />
				<meta
					property="og:description"
					content="Manage your all your IT department's needs on one simple, easy-to-use platform"
				/>
				<meta
					property="og:image"
					content="https://it-ticketing.vercel.app/it_department.png"
				/>
			</Head>

			<Flex
				as="main"
				alignItems="center"
				flexDirection="column"
				h="80%"
				w="full"
			>
				{content}
			</Flex>
		</>
	)
}
