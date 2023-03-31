import { Button, Flex } from "@chakra-ui/react"
import Header from "@/components/Header"
import TicketForm from "@/components/TicketForm"
import { getAllCollectionItems } from "@/lib/tickets"
import { getItemData } from "@/lib/tickets"
import { ticketDetailsType } from "@/types/ticketTypes"

export default function EditTicket(props: ticketDetailsType) {

	return (
		<Flex direction="column" w="full">
			<Header title="Edit Ticket" buttonName="None" itemId={props.id} />
			<TicketForm buttonName="Save Changes" ticket={props} />
		</Flex>
	)
}

export async function getStaticPaths() {
	const paths = await getAllCollectionItems("tickets", "id")

	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const ticketData = await getItemData("tickets", params.id)

	return {
		props: {
			...ticketData,
		},
	}
}
