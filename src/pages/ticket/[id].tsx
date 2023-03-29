import Header from "@/components/Header"
import { getAllCollectionItems, getItemData } from "@/lib/tickets"
import { ticketDetailsType } from "@/types/ticketTypes"
import { CheckIcon, TimeIcon } from "@chakra-ui/icons"
import { Flex, Box, Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function Ticket(params: ticketDetailsType) {
	const ticketFields = [
		{ fieldName: "Description", fieldData: params.description },
		{ fieldName: "First Name", fieldData: params.first_name },
		{ fieldName: "Last Name", fieldData: params.last_name },
		{ fieldName: "Employee ID", fieldData: params.employee_id },
		{ fieldName: "Email", fieldData: params.email },
		{ fieldName: "Symptom", fieldData: params.symptom },
		{ fieldName: "Department", fieldData: params.department },
		{ fieldName: "Assigned Tech", fieldData: params.assigned_tech },
	]

	const router = useRouter()

	const handleClick = () => {
		router.push(`/ticket/edit/${params.id}`)
	}

	return (
		<Flex direction="column" w="full">
			<Header
				title="Ticket"
				itemId={params.id}
				buttonName="Edit Ticket"
				buttonIcon="Edit"
				onClick={handleClick}
			/>
			<Flex
				flexDirection="column"
				w={{ base: "90%", lg: "40%" }}
				gap="15px"
				fontSize="lg"
				alignSelf="center"
				paddingY="20px"
			>
				{ticketFields.map((field) => (
					<Flex flexDirection="column" key={field.fieldName}>
						<Box
							as="span"
							fontWeight="medium"
							fontSize="xs"
							color="gray.500"
							letterSpacing="tight"
						>
							{field.fieldName}
						</Box>
						{field.fieldData}
					</Flex>
				))}

				<Flex flexDirection="column">
					<Box
						as="span"
						fontWeight="medium"
						fontSize="xs"
						color="gray.500"
						letterSpacing="tight"
					>
						Status
					</Box>
					{params.resolved ? (
						<Tag
							size="lg"
							colorScheme="green"
							borderRadius="full"
							justifyContent="center"
							w="50"
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
							justifyContent="center"
							w="40"
						>
							<TagLeftIcon boxSize="12px" as={TimeIcon} />
							<TagLabel>Pending</TagLabel>
						</Tag>
					)}
					<Flex flexDirection="column">
						<Box
							as="span"
							fontWeight="medium"
							fontSize="xs"
							color="gray.500"
							letterSpacing="tight"
						>
							Notes
						</Box>
						{params.notes}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

export async function getStaticPaths() {
	const paths = await getAllCollectionItems("tickets", "id")

	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const ticketData = await getItemData("tickets", params.id)

	return {
		props: {
			...ticketData,
		},
	}
}
