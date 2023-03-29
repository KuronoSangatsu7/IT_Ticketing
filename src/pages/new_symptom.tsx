import SymptomForm from "@/components/SymptomForm"
import { Flex } from "@chakra-ui/react"
import Header from "@/components/Header"

export default function NewTech() {
	return (
		<Flex direction="column" w="full">
			<Header title="New Symptom" buttonName="None" />
			<SymptomForm />
		</Flex>
	)
}
