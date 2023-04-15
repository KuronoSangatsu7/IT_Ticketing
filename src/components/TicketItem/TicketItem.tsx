import {
	Tag,
	Grid,
	GridItem,
	Link,
	TagLabel,
	TagLeftIcon,
	Divider,
	Box,
} from "@chakra-ui/react"
import { ticketDetailsType } from "@/types/ticketTypes"
import {
	EmailIcon,
	ChevronRightIcon,
	TimeIcon,
	CheckIcon,
} from "@chakra-ui/icons"
import NextLink from "next/link"

export default function Ticket(ticketDetails: ticketDetailsType) {
	return (
		<>
			<Link
				aria-label={`Symptom ${ticketDetails.id}`}
				as={NextLink}
				href={`/ticket/${ticketDetails.id}`}
				paddingY="15px"
				paddingX="25px"
				borderRadius={{ base: "lg", lg: "none" }}
				_hover={{ bg: "blackAlpha.200" }}
				w={{ base: "80%", lg: "full" }}
				alignSelf="center"
				my={{ base: "5px", lg: "0" }}
				shadow={{ base: "gray", lg: "none" }}
			>
				<Grid
					templateColumns={{
						base: "repeat (2, 1fr)",
						lg: "repeat(10, 1fr)",
					}}
					columnGap={1}
					rowGap={4}
					fontSize={{ base: "xl", lg: "md" }}
					letterSpacing={{ base: "wider", lg: "tight" }}
					alignItems="center"
				>
					<GridItem
						colSpan={2}
						minW="180px"
						display="flex"
						flexDirection="column"
					>
						<Box
							display={{ base: "block", lg: "none" }}
							fontWeight="medium"
							fontSize="sm"
							color="gray.500"
							letterSpacing="tight"
						>
							Symptom:
						</Box>
						{ticketDetails.symptom}
					</GridItem>
					<GridItem
						minW="75px"
						display={{ base: "none", lg: "block" }}
					>
						{ticketDetails.first_name}
					</GridItem>
					<GridItem
						minW="75px"
						display={{ base: "none", lg: "block" }}
					>
						{ticketDetails.last_name}
					</GridItem>
					<GridItem
						minW="75px"
						display={{ base: "none", lg: "block" }}
					>
						{ticketDetails.employee_id}
					</GridItem>
					<GridItem
						minW="75px"
						display={{ base: "none", lg: "block" }}
					>
						{<EmailIcon color="blackAlpha.600" />}
					</GridItem>

					<GridItem
						minW="120px"
						colSpan={{ base: 2, lg: "auto" }}
						display="flex"
						flexDirection="column"
					>
						<Box
							display={{ base: "block", lg: "none" }}
							fontWeight="medium"
							fontSize="sm"
							color="gray.500"
							letterSpacing="tight"
						>
							Department:
						</Box>
						{ticketDetails.department}
					</GridItem>
					<GridItem
						minW="120px"
						colSpan={{ base: 2, lg: "auto" }}
						display="flex"
						flexDirection="column"
					>
						<Box
							display={{ base: "block", lg: "none" }}
							fontWeight="medium"
							fontSize="sm"
							color="gray.500"
							letterSpacing="tight"
						>
							Assigned Tech:
						</Box>
						{ticketDetails.assigned_tech}
					</GridItem>
					<GridItem colSpan={{ base: 2, lg: "auto" }}>
						{ticketDetails.resolved ? (
							<Tag
								size="lg"
								colorScheme="green"
								borderRadius="full"
								w={{ base: "full", lg: "auto" }}
								justifyContent="center"
							>
								<TagLeftIcon boxSize="12px" as={CheckIcon} />
								<TagLabel>Resolved</TagLabel>
							</Tag>
						) : (
							<Tag
								size="lg"
								px="4"
								colorScheme="orange"
								borderRadius="full"
								w={{ base: "full", lg: "auto" }}
								justifyContent="center"
							>
								<TagLeftIcon boxSize="12px" as={TimeIcon} />
								<TagLabel>Pending</TagLabel>
							</Tag>
						)}
					</GridItem>
					<GridItem
						display={{ base: "none", lg: "flex" }}
						alignItems="center"
						justifyContent="end"
						pr="8"
					>
						<ChevronRightIcon h="20px" w="20px" />
					</GridItem>
				</Grid>
			</Link>
			<Divider
				borderColor="blackAlpha.400"
				display={{ base: "none", lg: "block" }}
			/>
		</>
	)
}
