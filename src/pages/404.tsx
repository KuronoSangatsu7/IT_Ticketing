import { Box } from "@chakra-ui/react"
import Head from "next/head"

export default function Custom404() {
	return (
		<>
			<Head>
				<title>404</title>
				<meta
					name="description"
					content="IT Ticketing - 404 - Page not found"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>

			<Box fontSize="2xl" mt="200px">
				404 - Page Not Found
			</Box>
		</>
	)
}
