import Header from "@/components/Header"
import { getAllCollectionItems, getItemData } from "@/lib/tickets"
import { techDetailsType } from "@/types/techTypes"
import { Flex, Box } from "@chakra-ui/react"

export default function Ticket(params: techDetailsType) {
	const techFields = [
		{ fieldName: "Name", fieldData: params.full_name },
		{ fieldName: "Department", fieldData: params.department },
		{ fieldName: "IT Email", fieldData: params.email },
		{ fieldName: "Assigned Tickets", fieldData: params.assigned_tickets },
	]

	return (
		<Flex direction="column" w="full">
			<Header
				title="Tech"
				itemId={params.id}
				buttonName="Edit Tech"
				buttonIcon="Edit"
			/>
			<Flex
				flexDirection="column"
				w={{ base: "90%", lg: "40%" }}
				gap="15px"
				fontSize="lg"
				alignSelf="center"
				paddingY="20px"
			>
				{techFields.map((field) => (
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
			</Flex>
		</Flex>
	)
}

export async function getStaticPaths() {
	const paths = await getAllCollectionItems("techs", "id")

	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const techData = await getItemData("techs", params.id)

	return {
		props: {
			...techData,
		},
	}
}
