import { Flex } from "@chakra-ui/react"
import Header from "@/components/Header"
import TechForm from "@/components/TechForm"
import { deleteItem, getAllCollectionItems, updateItem } from "@/lib/tickets"
import { getItemData } from "@/lib/tickets"
import { techDetailsType } from "@/types/techTypes"
import { useAtom } from "jotai"
import { currentUserAtom } from "@/store/store"
import { useRouter } from "next/router"
import InsufficientPermissionMessage from "@/components/InsufficientPermissionMessage"
import Head from "next/head"

export default function EditTech(props: techDetailsType) {
	const [currentUser] = useAtom(currentUserAtom)

	const router = useRouter()

	const handleSubmit = (
		data: Omit<techDetailsType, "id" | "owner_id" | "assigned_tickets">
	) => {
		const updateQuery: techDetailsType = {
			...data,
			id: props.id,
			assigned_tickets: 0,
			owner_id: currentUser ? currentUser.uid : "no one",
		}

		return updateItem("techs", updateQuery)
	}

	const handleDelete = async () => {
		return deleteItem("techs", props.id)
	}

	const handleBack = () => {
		router.push(`/tech/${props.id}`)
	}

	let content = (
		<Flex direction="column" w="full">
			<Header
				title="Edit Tech"
				buttonName="None"
				itemId={props.id}
				onBack={handleBack}
			/>
			<TechForm
				buttonName="Save Changes"
				tech={props}
				onSubmit={handleSubmit}
				onDelete={handleDelete}
			/>
		</Flex>
	)

	if (currentUser)
		if (currentUser.uid != props.owner_id)
			content = <InsufficientPermissionMessage />

	return (
		<>
			<Head>
				<title>Edit Tech #{props.id}</title>
				<meta
					name="description"
					content={`Edit Technician No.${props.id} info`}
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>

			{content}
		</>
	)
}

export async function getStaticPaths() {
	const paths = await getAllCollectionItems("techs", "id")

	return {
		paths,
		fallback: "blocking",
	}
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const techData = await getItemData("techs", params.id)

	// Tech does not exist
	if (!techData.owner_id) {
		return {
			notFound: true,
			revalidate: 5,
		}
	}

	return {
		props: {
			...techData,
		},
		revalidate: 5,
	}
}
