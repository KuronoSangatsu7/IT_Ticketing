import { Button, Flex } from "@chakra-ui/react"
import Header from "@/components/UI/Header"
import TicketForm from "@/components/Ticket/TicketForm/TicketForm"
import {
	deleteItem,
	getAllCollectionItems,
	updateItem,
	getItemData,
} from "@/lib/firebaseComms"
import { ticketDetailsType } from "@/types/ticketTypes"
import { useAtom } from "jotai"
import { currentUserAtom } from "@/store/store"
import { useRouter } from "next/router"
import InsufficientPermissionMessage from "@/components/Messages/InsufficientPermissionMessage"
import Head from "next/head"

export default function EditTicket(props: ticketDetailsType) {
	const [currentUser] = useAtom(currentUserAtom)

	const router = useRouter()

	const handleSubmit = (data: Omit<ticketDetailsType, "id" | "owner_id">) => {
		const updateQuery: ticketDetailsType = {
			...data,
			id: props.id,
			owner_id: currentUser ? currentUser.uid : "no one",
		}

		return updateItem("tickets", updateQuery)
	}

	const handleDelete = async () => {
		return deleteItem("tickets", props.id)
	}

	const handleBack = () => {
		router.push(`/ticket/${props.id}`)
	}

	let content = (
		<Flex direction="column" w="full">
			<Header
				title="Edit Ticket"
				buttonName="None"
				itemId={props.id}
				onBack={handleBack}
			/>
			<TicketForm
				buttonName="Save Changes"
				ticket={props}
				onSubmit={handleSubmit}
				onDelete={handleDelete}
			/>
		</Flex>
	)

	if (currentUser)
		if (currentUser.uid != props.owner_id)
			content = <InsufficientPermissionMessage />

	return (
		<>
			<Head>
				<title>Edit Ticket #{props.id} | IT Ticketing</title>
				<meta
					name="description"
					content={`Edit Ticket No.${props.id}`}
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					property="og:title"
					content={`Edit Ticket #${props.id} | IT Ticketing`}
				/>
				<meta
					property="og:description"
					content={`Edit Ticket No.${props.id}`}
				/>
				<meta
					property="og:image"
					content="https://it-ticketing.vercel.app/it_department.png"
				/>
			</Head>
			{content}
		</>
	)
}

export async function getStaticPaths() {
	const paths = await getAllCollectionItems("tickets", "id")

	return {
		paths,
		fallback: "blocking",
	}
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const ticketData = await getItemData("tickets", params.id)

	// Ticket does not exist
	if (!ticketData.owner_id) {
		return {
			notFound: true,
			revalidate: 5,
		}
	}

	return {
		props: {
			...ticketData,
		},
		revalidate: 5,
	}
}
