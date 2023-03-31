import SignInButton from "@/components/SignInButton"
import { currentUserAtom } from "@/store/store"
import { Box, Flex } from "@chakra-ui/react"
import { useAtom } from "jotai"
import Head from "next/head"

export default function Home() {
	const [currentUser] = useAtom(currentUserAtom)

	return (
		<>
			<Head>
				<title>IT Ticketing</title>
				<meta
					name="description"
					content="Managing IT department tickets"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>

			<Flex
				as="main"
				alignItems="center"
				flexDirection="column"
				h="80%"
				w="full"
			>
				<Box as="span" fontSize="4xl" p="200px">
					Welcome to IT Ticketing!
				</Box>
				{!currentUser && <SignInButton />}
			</Flex>
		</>
	)
}
