import Header from "@/components/Header"
import { getAllCollectionItems, getItemData } from "@/lib/tickets"
import { symptomDetailsType } from "@/types/symptomTypes"
import { Flex, Box } from "@chakra-ui/react"

export default function Ticket(params: symptomDetailsType) {
	const symptomFields = [
		{ fieldName: "Name", fieldData: params.name },
		{ fieldName: "Department", fieldData: params.department },
	]

	return (
		<Flex direction="column" w="full">
			<Header
				title="Symptom"
				itemId={params.id}
				buttonName="Edit Symptom"
				buttonIcon="Edit"
			/>
			<Flex
				flexDirection="column"
				w={{base: '90%', lg: "40%"}}
				gap="15px"
				fontSize="lg"
				alignSelf="center"
				paddingY="20px"
			>
				{symptomFields.map((field) => (
					<Flex flexDirection="column">
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
	const paths = await getAllCollectionItems("symptoms", "id")

	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const symptomData = await getItemData("symptoms", params.id)

	return {
		props: {
			...symptomData,
		},
	}
}
