import { Flex } from "@chakra-ui/react"
import Header from "@/components/Header"
import { deleteItem, getAllCollectionItems, updateItem } from "@/lib/tickets"
import { getItemData } from "@/lib/tickets"
import { symptomDetailsType } from "@/types/symptomTypes"
import SymptomForm from "@/components/SymptomForm"
import { useAtom } from "jotai"
import { currentUserAtom } from "@/store/store"
import { useRouter } from "next/router"

export default function EditSymptom(props: symptomDetailsType) {

	const [currentUser] = useAtom(currentUserAtom)

	const router = useRouter()

	const handleSubmit = (data: Omit<symptomDetailsType, "id" | "owner_id">) => {
		const updateQuery: symptomDetailsType = {
			...data,
			id: props.id,
			owner_id: currentUser ? currentUser.uid : "no one",
		}
		
		return updateItem("symptoms", updateQuery)
	}

	const handleDelete = async() => {
		return deleteItem("symptoms", props.id)
	}

	const handleBack = () => {
		router.push(`/symptom/${props.id}`)
	}

	return (
		<Flex direction="column" w="full">
			<Header title="Edit Symptom" buttonName="None" itemId={props.id} onBack={handleBack} />
			<SymptomForm buttonName="Save Changes" symptom={props} onSubmit={handleSubmit} onDelete={handleDelete} />
		</Flex>
	)
}

export async function getStaticPaths() {
	const paths = await getAllCollectionItems("symptoms", "id")

	return {
		paths,
		fallback: 'blocking',
	}
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const symptomData = await getItemData("symptoms", params.id)

	return {
		props: {
			...symptomData,
		},
		revalidate: 5
	}
}
