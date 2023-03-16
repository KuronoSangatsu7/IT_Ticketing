import {
	Flex,
	Heading,
	Spacer,
	Button,
	Divider,
	VStack,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

export default function Header({ title }: { title: string }) {
	return (
		<VStack
			minH='10px'
			h="10%"
			paddingTop="6"
			paddingBottom="4"
			paddingX="8"
			alignItems="center"
			flexDirection="column"
		>
			<Flex w="full">
				<Heading>{title}</Heading>
				<Spacer></Spacer>
				<Button
					borderRadius="md"
					bg="lighterBlue"
					textColor="whiteAlpha.900"
					leftIcon={<AddIcon />}
					_hover={{bg: 'black'}}
				>
					New Ticket
				</Button>
			</Flex>
			<Spacer />
			<Divider borderColor="blackAlpha.800" />
		</VStack>
	)
}
