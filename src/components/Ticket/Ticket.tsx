import {
	Tag,
	Grid,
	GridItem,
	Link,
	TagLabel,
	TagLeftIcon,
	Divider,
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
				as={NextLink}
				href="/"
				paddingY="15px"
				paddingX="25px"
				_hover={{ bg: "blackAlpha.200" }}
			>
				<Grid templateColumns="repeat(21, 1fr)" columnGap={1}>
					<GridItem colSpan={7}>{ticketDetails.description}</GridItem>
					<GridItem>{<EmailIcon color="blackAlpha.600" />}</GridItem>
					<GridItem>{ticketDetails.first_name}</GridItem>
					<GridItem>{ticketDetails.last_name}</GridItem>
					<GridItem>{ticketDetails.employee_id}</GridItem>
					<GridItem colSpan={3}>{ticketDetails.symptom}</GridItem>
					<GridItem colSpan={2}>{ticketDetails.department}</GridItem>
					<GridItem colSpan={2}>
						{ticketDetails.assigned_tech}
					</GridItem>
					<GridItem>
						{ticketDetails.resolved ? (
							<Tag
								size="lg"
								colorScheme="green"
								borderRadius="full"
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
							>
								<TagLeftIcon boxSize="12px" as={TimeIcon} />
								<TagLabel>Pending</TagLabel>
							</Tag>
						)}
					</GridItem>
					<GridItem colSpan={2} justifySelf='end'>
						<ChevronRightIcon />
					</GridItem>
				</Grid>
			</Link>
			<Divider borderColor="blackAlpha.400" />
		</>
	)
}
