import { Button, Flex } from "@chakra-ui/react"
import Header from "@/components/Header"
import TicketForm from "@/components/TicketForm"
import { deleteItem, getAllCollectionItems, updateItem } from "@/lib/tickets"
import { getItemData } from "@/lib/tickets"
import { ticketDetailsType } from "@/types/ticketTypes"
import { useAtom } from "jotai"
import { currentUserAtom } from "@/store/store"

export default function EditTicket(props: ticketDetailsType) {

	const [currentUser] = useAtom(currentUserAtom)

	const handleSubmit = (data: Omit<ticketDetailsType, "id" | "owner_id">) => {
		const updateQuery: ticketDetailsType = {
			...data,
			id: props.id,
			owner_id: currentUser ? currentUser.uid : "no one",
		}
		
		return updateItem("tickets", updateQuery)
	}

	const handleDelete = async() => {
		return deleteItem("tickets", props.id)
	}

	return (
		<Flex direction="column" w="full">
			<Header title="Edit Ticket" buttonName="None" itemId={props.id} />
			<TicketForm buttonName="Save Changes" ticket={props} onSubmit={handleSubmit} onDelete={handleDelete} />
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
