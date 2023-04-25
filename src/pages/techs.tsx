import Tech from "@/components/Tech/TechItem/TechItem"
import { Flex } from "@chakra-ui/react"
import Header from "@/components/UI/Header"
import TechLabel from "@/components/Tech/TechItem/TechLabel"
import LoadingSpinner from "@/components/UI/LoadingSpinner"
import { useRouter } from "next/router"
import { useAtom } from "jotai"
import { techsAtom } from "@/store/store"
import Head from "next/head"

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
		<>
			<Head>
				<title>View Techs | IT Ticketing</title>
				<meta
					name="description"
					content="Manage your IT department's technicians"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta property="og:title" content="View Techs | IT Ticketing" />
				<meta
					property="og:description"
					content="Manage your IT department's technicians"
				/>
				<meta
					property="og:image"
					content="https://it-ticketing.vercel.app/it_department.png"
				/>
			</Head>

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
		</>
	)
}
