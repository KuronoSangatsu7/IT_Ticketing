import TechForm from "@/components/TechForm"
import { Flex } from "@chakra-ui/react"
import Header from "@/components/Header"
import { useAtom } from "jotai"
import { currentUserAtom } from "@/store/store"
import { techDetailsType } from "@/types/techTypes"
import { addItem } from "@/lib/tickets"
import { useRouter } from "next/router"
import Head from "next/head"

export default function NewTech() {
	const [currentUser] = useAtom(currentUserAtom)

	const router = useRouter()

	const handleSubmit = (
		data: Omit<techDetailsType, "id" | "owner_id" | "assigned_tickets">
	) => {
		const addQuery: Omit<techDetailsType, "id"> = {
			...data,
			assigned_tickets: 0,
			owner_id: currentUser ? currentUser.uid : "no one",
		}

		return addItem("techs", addQuery)
	}

	const handleBack = () => {
		router.push("/techs")
	}

	return (
		<>
			<Head>
				<title>Add New Tech | IT Ticketing</title>
				<meta
					name="description"
					content="Create a new technician profile"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					property="og:title"
					content="Add New Tech | IT Ticketing"
				/>
				<meta
					property="og:description"
					content="Create a new technician profile"
				/>
				<meta
					property="og:image"
					content="https://it-ticketing.vercel.app/it_department.png"
				/>
			</Head>

			<Flex direction="column" w="full">
				<Header
					title="New Tech"
					buttonName="None"
					onBack={handleBack}
				/>
				<TechForm onSubmit={handleSubmit} />
			</Flex>
		</>
	)
}
