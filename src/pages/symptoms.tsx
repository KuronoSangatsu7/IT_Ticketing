import Symptom from "@/components/SymptomItem/SymptomItem"
import Header from "@/components/Header"
import { Flex } from "@chakra-ui/react"
import SymptomLabel from "@/components/SymptomItem/SymptomLabel"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useRouter } from "next/router"
import { useAtom } from "jotai"
import { symptomsAtom } from "@/store/store"
import Head from "next/head"

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
	const [symptoms] = useAtom(symptomsAtom)

	const router = useRouter()

	const handleClick = () => {
		router.push("/new_symptom")
	}

	let pageContent = <LoadingSpinner />

	symptoms &&
		(pageContent = (
			<>
				{symptoms.map((symptom) => (
					<Symptom {...symptom} key={symptom.id} />
				))}
			</>
		))

	return (
		<>
			<Head>
				<title>Symptoms</title>
				<meta
					name="description"
					content="Manage your IT department's symptoms"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>

			<Flex direction="column" h="full" w="full" borderRadius="xl">
				<Header
					title="Symptoms"
					buttonName="New Symptom"
					collectionName="symptoms"
					onClick={handleClick}
				/>
				<SymptomLabel />
				{pageContent}
			</Flex>
		</>
	)
}
