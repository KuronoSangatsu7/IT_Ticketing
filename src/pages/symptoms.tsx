import Symptom from "@/components/Symptom/SymptomItem/SymptomItem"
import Header from "@/components/UI/Header"
import { Flex } from "@chakra-ui/react"
import SymptomLabel from "@/components/Symptom/SymptomItem/SymptomLabel"
import LoadingSpinner from "@/components/UI/LoadingSpinner"
import { useRouter } from "next/router"
import { useAtom } from "jotai"
import { symptomsAtom } from "@/store/store"
import Head from "next/head"

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
				<title>View Symptoms | IT Ticketing</title>
				<meta
					name="description"
					content="Manage your IT department's symptoms"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					property="og:title"
					content="View Symptoms | IT Ticketing"
				/>
				<meta
					property="og:description"
					content="Manage your IT department's symptoms"
				/>
				<meta
					property="og:image"
					content="https://it-ticketing.vercel.app/it_department.png"
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
