import { Flex } from "@chakra-ui/react"
import Header from "@/components/Header"
import TechForm from "@/components/TechForm"
import { deleteItem, getAllCollectionItems, updateItem } from "@/lib/tickets"
import { getItemData } from "@/lib/tickets"
import { techDetailsType } from "@/types/techTypes"
import { useAtom } from "jotai"
import { currentUserAtom } from "@/store/store"

export default function EditTech(props: techDetailsType) {

	const [currentUser] = useAtom(currentUserAtom)

	const handleSubmit = (data: Omit<techDetailsType, "id" | "owner_id" | "assigned_tickets">) => {
		const updateQuery: techDetailsType = {
			...data,
			id: props.id,
			assigned_tickets: 0,
			owner_id: currentUser ? currentUser.uid : "no one",
		}
		
		return updateItem("techs", updateQuery)
	}

	const handleDelete = async() => {
		return deleteItem("techs", props.id)
	}

	return (
		<Flex direction="column" w="full">
			<Header title="Edit Tech" buttonName="None" itemId={props.id} />
			<TechForm buttonName="Save Changes" tech={props} onSubmit={handleSubmit} onDelete={handleDelete} />
		</Flex>
	)
}

export async function getStaticPaths() {
	const paths = await getAllCollectionItems("techs", "id")

	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const techData = await getItemData("techs", params.id)

	return {
		props: {
			...techData,
		},
	}
}
