import { Flex, Link, Divider } from "@chakra-ui/react"
import NextLink from "next/link"
import { AddIcon } from "@chakra-ui/icons"

export default function NewItem() {
	return (
		<>
			<Link
				as={NextLink}
				href="/"
				p="8px"
				_hover={{ bg: "blackAlpha.200" }}
			>
				<Flex
					alignItems="center"
					justifyContent="center"
					color="lighterBlue"
					paddingY="12px"
				>
					<AddIcon />
				</Flex>
			</Link>
			<Divider borderColor="blackAlpha.400" />
		</>
	)
}
