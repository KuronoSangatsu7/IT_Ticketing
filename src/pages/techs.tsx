import Tech from "@/components/TechItem/TechItem"
import { Flex } from "@chakra-ui/react"
import Header from "@/components/Header"
import TechLabel from "@/components/TechItem/TechLabel"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useRouter } from "next/router"
import { useAtom } from "jotai"
import { techsAtom } from "@/store/store"
import useFirebaseSub from "@/hooks/use-firebase-sub"

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
	const [techs] = useAtom(techsAtom)

	const router = useRouter()

	const handleClick = () => {
		router.push("/new_tech")
	}

	let pageContent = <LoadingSpinner />

	techs &&
		(pageContent = (
			<>
				{techs.map((tech) => (
					<Tech {...tech} key={tech.id} />
				))}
			</>
		))

	return (
		<Flex direction="column" h="full" w="full" borderRadius="xl">
			<Header
				title="Techs"
				buttonName="New Tech"
				collectionName="techs"
				onClick={handleClick}
			/>
			<TechLabel />
			{pageContent}
		</Flex>
	)
}
