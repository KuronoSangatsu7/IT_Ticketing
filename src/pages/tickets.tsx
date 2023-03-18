import { Divider, Flex } from "@chakra-ui/react"
import Ticket from "@/components/Ticket/Ticket"
import TicketLabel from "@/components/Ticket/TicketLabel"
import { ticketDetailsType } from "@/types/ticketTypes"
import NewItem from "@/components/NewItem"
import Header from "@/components/Header"

const tickets: ticketDetailsType[] = Object.values({
	"1": {
		assigned_tech: "Shelley Ginder",
		department: "General Issues",
		description:
			"When I turn on my computer the lights flash and it turns off",
		email: "fredrick.thompson@fakeitcompany.com",
		employee_id: "33562",
		first_name: "Fredrick",
		last_name: "Thompson",
		notes: "",
		resolved: false,
		symptom: "Computer wont turn on",
		ticket_id: "1",
	},
	"5": {
		assigned_tech: "Justin Sample",
		department: "Network",
		description: "I'm unable to receive emails",
		email: "patsy.sheehan@fakeitcompany.com",
		employee_id: "66722",
		first_name: "Patsy",
		last_name: "Sheehan",
		notes: "",
		resolved: true,
		symptom: "Issues with email",
		ticket_id: "5",
	},
})

export default function Tickets() {
	return (
		<Flex direction="column" h="full" borderRadius="xl"  >
			<Header title="Tickets" />
			<TicketLabel />
			{tickets.map((ticket) => (
				<Ticket {...ticket} key={ticket["ticket_id"]} />
			))}
			<NewItem />
		</Flex>
	)
}
