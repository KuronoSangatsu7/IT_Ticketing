import { Box } from "@chakra-ui/react"
import Head from "next/head"

export default function Custom404() {
	return (
		<>
			<Head>
				<title>404 - Page Not Found | IT Ticketing</title>
				<meta
					name="description"
					content="Page not found | IT Ticketing"
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
