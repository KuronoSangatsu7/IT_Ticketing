import SymptomForm from "@/components/SymptomForm"
import { Flex } from "@chakra-ui/react"
import Header from "@/components/Header"
import { useAtom } from "jotai"
import { currentUserAtom } from "@/store/store"
import { symptomDetailsType } from "@/types/symptomTypes"
import { addItem } from "@/lib/tickets"
import { useRouter } from "next/router"
import Head from "next/head"

export default function NewSymptom() {
	const [currentUser] = useAtom(currentUserAtom)

	const router = useRouter()

	const handleSubmit = (
		data: Omit<symptomDetailsType, "id" | "owner_id">
	) => {
		const addQuery: Omit<symptomDetailsType, "id"> = {
			...data,
			owner_id: currentUser ? currentUser.uid : "no one",
		}

		return addItem("symptoms", addQuery)
	}

	const handleBack = () => {
		router.push("/symptoms")
	}

	return (
		<>
			<Head>
				<title>Add New Symptom | IT Ticketing</title>
				<meta
					name="description"
					content="Create a new symptom for your issues"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					property="og:title"
					content="Add New Symptom | IT Ticketing"
				/>
				<meta
					property="og:description"
					content="Create a new symptom for your issues"
				/>
				<meta
					property="og:image"
					content="https://it-ticketing.vercel.app/it_department.png"
				/>
			</Head>

			<Flex direction="column" w="full">
				<Header
					title="New Symptom"
					buttonName="None"
					onBack={handleBack}
				/>
				<SymptomForm onSubmit={handleSubmit} />
			</Flex>
		</>
	)
}
