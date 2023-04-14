import TicketForm from "@/components/TicketForm"
import { Flex } from "@chakra-ui/react"
import Header from "@/components/Header"
import { ticketDetailsType } from "@/types/ticketTypes"
import { useAtom } from "jotai"
import { currentUserAtom } from "@/store/store"
import { addItem } from "@/lib/tickets"
import { useRouter } from "next/router"

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
		<Flex direction="column" w="full">
			<Header title="New Ticket" buttonName="None" onBack={handleBack} />
			<TicketForm onSubmit={handleSubmit} />
		</Flex>
	)
}
