import {
	Flex,
	Heading,
	Spacer,
	Button,
	Divider,
	VStack,
	Text,
	IconButton,
	Select,
} from "@chakra-ui/react"
import { AddIcon, ArrowBackIcon, EditIcon } from "@chakra-ui/icons"
import { useAtom } from "jotai"
import { ticketFilterAtom } from "@/store/store"
import { ChangeEvent } from "react"

export default function Header(props: {
	title: string
	itemId?: string
	buttonName: string
	buttonIcon?: "Edit"
	collectionName?: string
	ticketFilter?: boolean
	onClick?: () => void
	onBack?: () => void
}) {
	const [currentTicketFilter, setCurrentTicketFilter] =
		useAtom(ticketFilterAtom)

	const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCurrentTicketFilter(e.target.value as "all-tickets" | "my-tickets")
	}

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
			<Flex w="full" alignItems="center" gap="5px">
				{props.onBack && (
					<IconButton
						h="50px"
						aria-label="Search database"
						icon={<ArrowBackIcon />}
						onClick={() => props.onBack && props.onBack()}
					/>
				)}
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
				{props.ticketFilter && (
					<>
						<Select
							defaultValue="all-tickets"
							value={currentTicketFilter}
							onChange={(e) => handleFilterChange(e)}
							w="200px"
						>
							<option value="all-tickets">All Tickets</option>
							<option value="my-tickets">My Tickets</option>
						</Select>
					</>
				)}
				{props.buttonName != "None" && (
					<>
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
							onClick={() => props.onClick && props.onClick()}
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
							onClick={() => props.onClick && props.onClick()}
						/>
					</>
				)}
			</Flex>
			<Divider borderColor="blackAlpha.800" />
		</VStack>
	)
}
