import TicketForm from "@/components/Ticket/TicketForm/TicketForm"
import { Flex } from "@chakra-ui/react"
import Header from "@/components/UI/Header"
import { ticketDetailsType } from "@/types/ticketTypes"
import { useAtom } from "jotai"
import { currentUserAtom } from "@/store/store"
import { addItem } from "@/lib/firebaseComms"
import { useRouter } from "next/router"
import Head from "next/head"

export default function NewTicket() {
	const [currentUser] = useAtom(currentUserAtom)

	const router = useRouter()

	const handleSubmit = (data: Omit<ticketDetailsType, "id" | "owner_id">) => {
		const addQuery: Omit<ticketDetailsType, "id"> = {
			...data,
			owner_id: currentUser ? currentUser.uid : "no one",
		}

		return addItem("tickets", addQuery)
	}

	const handleBack = () => {
		router.push("/tickets")
	}

	return (
		<>
			<Head>
				<title>Add New Ticket | IT Ticketing</title>
				<meta
					name="description"
					content="Create a new ticket for IT department"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					property="og:title"
					content="Add New Ticket | IT Ticketing"
				/>
				<meta
					property="og:description"
					content="Create a new ticket for IT department"
				/>
				<meta
					property="og:image"
					content="https://it-ticketing.vercel.app/it_department.png"
				/>
			</Head>

			<Flex direction="column" w="full">
				<Header
					title="New Ticket"
					buttonName="None"
					onBack={handleBack}
				/>
				<TicketForm onSubmit={handleSubmit} />
			</Flex>
		</>
	)
}
