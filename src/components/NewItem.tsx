import { Flex, Link, Box } from "@chakra-ui/react"
import NextLink from "next/link"

export default function () {
	return (
		<Link as={NextLink} href="/" p="8px" _hover={{ bg: "blackAlpha.200" }}>
			<Flex fontSize='2xl' fontWeight='extrabold' alignItems='center' justifyContent='center' color='cyan.700'>+</Flex>
		</Link>
	)
}
