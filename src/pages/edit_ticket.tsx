import Header from "@/components/Header"
import TicketForm from "@/components/TicketForm"
import { currentTicketAtom } from "@/store/store"
import { Flex } from "@chakra-ui/react"
import { useAtom } from "jotai"

export default function NewTicket() {

    const [currentTicket, setCurrentTicket] = useAtom(currentTicketAtom)

	return (
		<Flex direction="column" w="full">
			<Header title="Edit Ticket" buttonName="None" itemId={currentTicket.id} />
			<TicketForm ticket={currentTicket} buttonName="Submit Changes" />
		</Flex>
	)
}
