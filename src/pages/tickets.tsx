import { Flex } from "@chakra-ui/react"
import TicketItem from "@/components/TicketItem/TicketItem"
import TicketLabel from "@/components/TicketItem/TicketLabel"
import Header from "@/components/Header"
import { useRouter } from "next/router"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useAtom } from "jotai"
import { currentUserAtom, ticketFilterAtom, ticketsAtom } from "@/store/store"
import Head from "next/head"

// TODO: remove test data
// const _tickets: ticketDetailsType[] = Object.values({
// 	"1": {
// 		assigned_tech: "Shelley Ginder",
// 		department: "General Issues",
// 		description:
// 			"When I turn on my computer the lights flash and it turns off",
// 		email: "fredrick.thompson@fakeitcompany.com",
// 		employee_id: "33562",
// 		first_name: "Fredrick",
// 		last_name: "Thompson",
// 		notes: "",
// 		resolved: false,
// 		symptom: "Computer wont turn on",
// 		id: "1",
// 	},
// 	"5": {
// 		assigned_tech: "Justin Sample",
// 		department: "Network",
// 		description: "I'm unable to receive emails",
// 		email: "patsy.sheehan@fakeitcompany.com",
// 		employee_id: "66722",
// 		first_name: "Patsy",
// 		last_name: "Sheehan",
// 		notes: "",
// 		resolved: true,
// 		symptom: "Issues with email",
// 		id: "5",
// 	},
// })

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
				<title>Tickets</title>
				<meta
					name="description"
					content="Manage your IT department's tickets"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
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
