import { Flex } from "@chakra-ui/react"
import Header from "@/components/Header"
import { getAllCollectionItems } from "@/lib/tickets"
import { getItemData } from "@/lib/tickets"
import { symptomDetailsType } from "@/types/symptomTypes"
import SymptomForm from "@/components/SymptomForm"

export default function EditTicket(props: symptomDetailsType) {

	return (
		<Flex direction="column" w="full">
			<Header title="Edit Symptom" buttonName="None" itemId={props.id} />
			<SymptomForm buttonName="Save Changes" symptom={props} />
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
