import NewItem from "@/components/NewItem"
import Symptom from "@/components/Symptom/Symptom"
import { symptomDetailsType } from "@/types/symptomTypes"
import Header from "@/components/Header"
import { Flex, Divider } from "@chakra-ui/react"
import SymptomLabel from "@/components/Symptom/SymptomLabel"

const symptoms: symptomDetailsType[] = Object.values({
	"1": {
		symptom: "Keyboard or mouse issues",
		department: "General Issues",
		symptom_id: "1",
	},

	"7": {
		symptom: "Cannot connect to the internet",
		department: "Network",
		symptom_id: "7",
	},
})

export default function Symptoms() {
	return (
		<Flex direction="column" h="full" borderRadius="xl">
			<Header title="Symptoms" />
			<SymptomLabel />
			{symptoms.map((symptom) => (
				<Symptom {...symptom} key={symptom["symptom_id"]} />
			))}
			<NewItem />
		</Flex>
	)
}
