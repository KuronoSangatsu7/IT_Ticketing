import { Divider, Flex } from "@chakra-ui/react"
import Ticket from "@/components/Ticket"
import { ticketDetailsType } from "@/types/ticketTypes"

const tickets: ticketDetailsType[] = Object.values({
	"0": {
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
		ticket_id: "0",
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
	console.log(tickets)
	return (
		<Flex direction="column">
			{tickets.map((ticket) => (
				<>
					<Ticket {...ticket} key={ticket["ticket_id"]} /> <Divider />
				</>
			))}
		</Flex>
	)
}
