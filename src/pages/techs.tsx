import Tech from "@/components/Tech"
import { techDetailsType } from "@/types/techTypes"
import { Flex, Divider } from "@chakra-ui/react"

const techs: techDetailsType[] = Object.values({
	"1": {
		full_name: "Shelley Ginder",
		department: "General Issues",
		assigned_tickets: 5,
		email: "shelley.ginder@fakeitcompany.com",
		tech_id: "1",
	},
	"15": {
		full_name: "Justin Sample",
		department: "Network",
		assigned_tickets: 3,
		email: "justin@sample.com",
		tech_id: "15",
	},
})

export default function Techs() {
	return (
		<Flex direction="column">
			{techs.map((tech) => (
				<>
					<Tech {...tech} key={tech["tech_id"]} />
					<Divider />
				</>
			))}
		</Flex>
	)
}
