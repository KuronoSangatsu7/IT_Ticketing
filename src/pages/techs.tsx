import NewItem from "@/components/NewItem"
import Tech from "@/components/TechItem/TechItem"
import { techDetailsType } from "@/types/techTypes"
import { Flex, Divider } from "@chakra-ui/react"
import Header from "@/components/Header"
import TechLabel from "@/components/TechItem/TechLabel"
import { useEffect, useState } from "react"
import { getAllCollectionItems } from "@/lib/tickets"

// TODO: remove test data
// const techs: techDetailsType[] = Object.values({
// 	"1": {
// 		full_name: "Shelley Ginder",
// 		department: "General Issues",
// 		assigned_tickets: 5,
// 		email: "shelley.ginder@fakeitcompany.com",
// 		id: "1",
// 	},
// 	"15": {
// 		full_name: "Justin Sample",
// 		department: "Network",
// 		assigned_tickets: 3,
// 		email: "justin@sample.com",
// 		id: "15",
// 	},
// })

export default function Techs() {

	const [techs, setTechs] = useState<techDetailsType[]>([])

	useEffect(() => {
		const getTickets = async () => {
			const data = await getAllCollectionItems("techs", "data") as Promise<techDetailsType>[]

			return data
		}

		getTickets().then((data) =>
			Promise.all(data).then((values) => setTechs(values))
		)
	}, [])

	return (
		<Flex direction="column" h="full" w='full' borderRadius="xl">
			<Header title="Techs" buttonName="New Tech"/>
			<TechLabel />
			{techs.map((tech) => (
				<Tech {...tech} key={tech.id} />
			))}

			<NewItem />
		</Flex>
	)
}
