import Symptom from "@/components/SymptomItem/SymptomItem"
import { symptomDetailsType } from "@/types/symptomTypes"
import Header from "@/components/Header"
import { Flex } from "@chakra-ui/react"
import SymptomLabel from "@/components/SymptomItem/SymptomLabel"
import { useEffect, useState } from "react"
import { getAllCollectionItems } from "@/lib/tickets"
import ErrorMessage from "@/components/ErrorMessage"
import LoadingSpinner from "@/components/LoadingSpinner"

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
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const getTickets = async () => {
			const data = (await getAllCollectionItems(
				"symptoms",
				"data"
			)) as Promise<symptomDetailsType>[]

			return data
		}

		setLoading(true)
		getTickets().then((data) =>
			Promise.all(data)
				.then((values) => {
					setSymptoms(values)
					setLoading(false)
				})
				.catch((e) => setError(e))
		)
	}, [])

	let pageContent = <ErrorMessage />

	loading && !error && (pageContent = <LoadingSpinner />)

	!loading &&
		!error &&
		(pageContent = (
			<>
				{symptoms.map((symptom) => (
					<Symptom {...symptom} key={symptom.id} />
				))}
			</>
		))

	return (
		<Flex direction="column" h="full" w="full" borderRadius="xl">
			<Header title="Symptoms" buttonName="New Symptom" collectionName="symptoms" />
			<SymptomLabel />
			{pageContent}
		</Flex>
	)
}
