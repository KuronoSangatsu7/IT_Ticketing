import NewItem from "@/components/NewItem"
import Symptom from "@/components/SymptomItem/SymptomItem"
import { symptomDetailsType } from "@/types/symptomTypes"
import Header from "@/components/Header"
import { Flex } from "@chakra-ui/react"
import SymptomLabel from "@/components/SymptomItem/SymptomLabel"
import { useEffect, useState } from "react"
import { getAllCollectionItems } from "@/lib/tickets"

// TODO: remove test data
// const symptoms: symptomDetailsType[] = Object.values({
// 	"1": {
// 		symptom: "Keyboard or mouse issues",
// 		department: "General Issues",
// 		id: "1",
// 	},

// 	"7": {
// 		symptom: "Cannot connect to the internet",
// 		department: "Network",
// 		id: "7",
// 	},
// })

export default function Symptoms() {
	const [symptoms, setSymptoms] = useState<symptomDetailsType[]>([])

	useEffect(() => {
		const getTickets = async () => {
			const data = (await getAllCollectionItems(
				"symptoms",
				"data"
			)) as Promise<symptomDetailsType>[]

			return data
		}

		getTickets().then((data) =>
			Promise.all(data).then((values) => setSymptoms(values))
		)
	}, [])

	return (
		<Flex direction="column" h="full" w="full" borderRadius="xl">
			<Header title="Symptoms" buttonName="New Symptom" />
			<SymptomLabel />
			{symptoms.map((symptom) => (
				<Symptom {...symptom} key={symptom.id} />
			))}
			<NewItem />
		</Flex>
	)
}
