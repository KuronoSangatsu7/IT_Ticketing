import Tech from "@/components/TechItem/TechItem"
import { techDetailsType } from "@/types/techTypes"
import { Flex } from "@chakra-ui/react"
import Header from "@/components/Header"
import TechLabel from "@/components/TechItem/TechLabel"
import { useEffect, useState } from "react"
import { getAllCollectionItems } from "@/lib/tickets"
import useFirebaseSub from "@/hooks/use-firebase-sub"
import ErrorMessage from "@/components/ErrorMessage"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useRouter } from "next/router"

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
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const router = useRouter()

	// const { reload } = useFirebaseSub("techs")

	useEffect(() => {
		const getTickets = async () => {
			const data = (await getAllCollectionItems(
				"techs",
				"data"
			)) as Promise<techDetailsType>[]

			return data
		}

		setLoading(true)
		getTickets().then((data) =>
			Promise.all(data)
				.then((values) => {
					setTechs(values)
					setLoading(false)
				})
				.catch((e) => setError(e))
		)
	}, [])

	const handleClick = () => {
		router.push('/new_tech')
	}

	let pageContent = <ErrorMessage />

	loading && !error && (pageContent = <LoadingSpinner />)

	!loading &&
		!error &&
		(pageContent = (
			<>
				{techs.map((tech) => (
					<Tech {...tech} key={tech.id} />
				))}
			</>
		))

	return (
		<Flex direction="column" h="full" w="full" borderRadius="xl">
			<Header title="Techs" buttonName="New Tech" collectionName="techs" onClick={handleClick} />
			<TechLabel />
			{pageContent}
		</Flex>
	)
}
