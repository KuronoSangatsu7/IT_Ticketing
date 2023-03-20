import {
	Flex,
	Heading,
	Spacer,
	Button,
	Divider,
	VStack,
	Text,
	IconButton,
} from "@chakra-ui/react"
import { AddIcon, EditIcon } from "@chakra-ui/icons"

export default function Header(props: {
	title: string
	itemId?: string
	buttonName: string
	buttonIcon?: "Edit"
}) {
	return (
		<VStack
			minH="10px"
			h="10%"
			w="full"
			paddingTop="6"
			paddingBottom="4"
			paddingX="8"
			alignItems="center"
			flexDirection="column"
			minHeight="75px"
		>
			<Flex w="full">
				<Heading>
					{props.title}
					{props.hasOwnProperty("itemId") ? (
						<Text
							as="span"
							fontWeight="hairline"
							fontSize={{ base: "sm", md: "xl" }}
						>{` #${props.itemId}`}</Text>
					) : (
						<></>
					)}
				</Heading>
				<Spacer></Spacer>
				<Button
					display={{ base: "none", md: "block" }}
					borderRadius="md"
					bg="lighterBlue"
					textColor="whiteAlpha.900"
					leftIcon={
						props.hasOwnProperty("buttonIcon") ? (
							<EditIcon />
						) : (
							<AddIcon />
						)
					}
					_hover={{ bg: "black" }}
					w="156px"
				>
					{props.buttonName}
				</Button>
				<IconButton
					aria-label={props.buttonName}
					icon={
						props.hasOwnProperty("buttonIcon") ? (
							<EditIcon
								color="whiteAlpha.900"
								h="25px"
								w="25px"
							/>
						) : (
							<AddIcon color="whiteAlpha.900" />
						)
					}
					borderRadius="full"
					display={{ base: "block", md: "none" }}
					bg="lighterBlue"
					_hover={{ bg: "black" }}
					h="70px"
					w="70px"
					position="fixed"
					right="40px"
					bottom="40px"
				/>
			</Flex>
			<Divider borderColor="blackAlpha.800" />
		</VStack>
	)
}
