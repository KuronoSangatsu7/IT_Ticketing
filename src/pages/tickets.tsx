import { Flex } from "@chakra-ui/react"
import TicketItem from "@/components/Ticket/TicketItem/TicketItem"
import TicketLabel from "@/components/Ticket/TicketItem/TicketLabel"
import Header from "@/components/UI/Header"
import { useRouter } from "next/router"
import LoadingSpinner from "@/components/UI/LoadingSpinner"
import { useAtom } from "jotai"
import { currentUserAtom, ticketFilterAtom, ticketsAtom } from "@/store/store"
import Head from "next/head"

export default function Tickets() {
	const router = useRouter()
	const [tickets] = useAtom(ticketsAtom)
	const [currentUser] = useAtom(currentUserAtom)
	const [currentTicketFilter] = useAtom(ticketFilterAtom)

	const handleClick = () => {
		router.push("/new_ticket")
	}

	let pageContent = <LoadingSpinner />

	tickets &&
		currentTicketFilter == "all-tickets" &&
		(pageContent = (
			<>
				{tickets.map((ticket) => (
					<TicketItem {...ticket} key={ticket.id} />
				))}
			</>
		))

	tickets &&
		currentUser &&
		currentTicketFilter == "my-tickets" &&
		(pageContent = (
			<>
				{tickets
					.filter((ticket) => ticket.owner_id == currentUser.uid)
					.map((ticket) => (
						<TicketItem {...ticket} key={ticket.id} />
					))}
			</>
		))

	return (
		<>
			<Head>
				<title>View Tickets | IT Ticketing</title>
				<meta
					name="description"
					content="Manage your IT department's tickets"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					property="og:title"
					content="View Tickets | IT Ticketing"
				/>
				<meta
					property="og:description"
					content="Manage your IT department's tickets"
				/>
				<meta
					property="og:image"
					content="https://it-ticketing.vercel.app/it_department.png"
				/>
			</Head>

			<Flex direction="column" h="full" w="full" borderRadius="xl">
				<Header
					title="Tickets"
					buttonName="New Ticket"
					collectionName="tickets"
					ticketFilter={true}
					onClick={handleClick}
				/>
				<TicketLabel />
				{pageContent}
			</Flex>
		</>
	)
}
