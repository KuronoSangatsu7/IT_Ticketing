import TicketForm from "@/components/TicketForm"
import { Flex } from "@chakra-ui/react"
import Header from "@/components/Header"

export default function NewTicket() {
	return (
		<Flex direction="column" w="full">
			<Header title="New Ticket" buttonName="None" />
			<TicketForm />
		</Flex>
	)
}
