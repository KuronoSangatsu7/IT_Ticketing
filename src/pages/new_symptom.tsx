import SymptomForm from "@/components/SymptomForm"
import { Flex } from "@chakra-ui/react"
import Header from "@/components/Header"
import { useAtom } from "jotai"
import { currentUserAtom } from "@/store/store"
import { symptomDetailsType } from "@/types/symptomTypes"
import { addItem } from "@/lib/tickets"

export default function NewSymptom() {
	const [currentUser] = useAtom(currentUserAtom)

	const handleSubmit = (data: Omit<symptomDetailsType, "id" | "owner_id">) => {
		const addQuery: Omit<symptomDetailsType, "id"> = {
			...data,
			owner_id: currentUser ? currentUser.uid : "no one",
		}
		
		return addItem("symptoms", addQuery)
	}

	return (
		<Flex direction="column" w="full">
			<Header title="New Symptom" buttonName="None" />
			<SymptomForm  onSubmit={handleSubmit} />
		</Flex>
	)
}
