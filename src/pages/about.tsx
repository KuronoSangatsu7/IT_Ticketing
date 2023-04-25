import { Box, Flex, Heading } from "@chakra-ui/react"
import Head from "next/head"

export default function About() {
	return (
		<>
			<Head>
				<title>About Us | IT Ticketing</title>
				<meta
					name="description"
					content="IT Ticketing was a product built purely for education purposes by a team of one."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta property="og:title" content="IT Ticketing" />
				<meta
					property="og:description"
					content="IT Ticketing was a product built purely for education purposes by a team of one."
				/>
				<meta
					property="og:image"
					content="https://it-ticketing.vercel.app/it_department.png"
				/>
			</Head>

			<Flex
				pt="200px"
				pb="50px"
				textAlign="center"
				w="70%"
				flexDirection="column"
				gap="60px"
				as="main"
				alignItems="center"
			>
				<Heading as="h1" fontSize="4xl">
					About Us
				</Heading>
				<Heading as="h2" fontSize="xl">
					This project was built by the TechOps team which consists
					of: me.
					<br /> It was built mainly for learning purposes, to apply
					all that I have learned about front-end development so far
					(obviously I still have a long way to go).
					<br />
					Nontheless, our team is more than happy with the product we
					were able to deliver in such a short amount of time, and we
					might continue to build on top of it later.
					<br />
					Thank you!
				</Heading>
				<Box as="footer" marginTop="auto">
					Built by Jaffar Totanji
				</Box>
			</Flex>
		</>
	)
}
