import { Flex } from "@chakra-ui/react"
import Header from "@/components/Header"
import TechForm from "@/components/TechForm"
import { getAllCollectionItems } from "@/lib/tickets"
import { getItemData } from "@/lib/tickets"
import { techDetailsType } from "@/types/techTypes"

export default function EditTicket(props: techDetailsType) {

	return (
		<Flex direction="column" w="full">
			<Header title="Edit Tech" buttonName="None" itemId={props.id} />
			<TechForm buttonName="Submit Changes" tech={props} />
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
