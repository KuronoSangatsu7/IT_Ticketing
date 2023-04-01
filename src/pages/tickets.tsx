import { Flex } from "@chakra-ui/react"
import TicketItem from "@/components/TicketItem/TicketItem"
import TicketLabel from "@/components/TicketItem/TicketLabel"
import Header from "@/components/Header"
import { useRouter } from "next/router"
import LoadingSpinner from "@/components/LoadingSpinner"
import useFirebaseSub from "@/hooks/use-firebase-sub"
import { useAtom } from "jotai"
import { ticketsAtom } from "@/store/store"

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
	// Setup a snapshot listener that will add tickets to global state
	useFirebaseSub("tickets")

	const router = useRouter()
	const [tickets] = useAtom(ticketsAtom)

	const handleClick = () => {
		router.push("/new_ticket")
	}

	let pageContent = <LoadingSpinner />

	tickets &&
		(pageContent = (
			<>
				{tickets.map((ticket) => (
					<TicketItem {...ticket} key={ticket.id} />
				))}
			</>
		))

	return (
		<Flex direction="column" h="full" w="full" borderRadius="xl">
			<Header
				title="Tickets"
				buttonName="New Ticket"
				collectionName="tickets"
				onClick={handleClick}
			/>
			<TicketLabel />
			{pageContent}
		</Flex>
	)
}
