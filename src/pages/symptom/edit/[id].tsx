import { Flex } from "@chakra-ui/react"
import Header from "@/components/UI/Header"
import {
	deleteItem,
	getAllCollectionItems,
	updateItem,
	getItemData,
} from "@/lib/firebaseComms"
import { symptomDetailsType } from "@/types/symptomTypes"
import SymptomForm from "@/components/Symptom/SymptomForm/SymptomForm"
import { useAtom } from "jotai"
import { currentUserAtom } from "@/store/store"
import { useRouter } from "next/router"
import InsufficientPermissionMessage from "@/components/Messages/InsufficientPermissionMessage"
import Head from "next/head"

export default function EditSymptom(props: symptomDetailsType) {
	const [currentUser] = useAtom(currentUserAtom)

	const router = useRouter()

	const handleSubmit = (
		data: Omit<symptomDetailsType, "id" | "owner_id">
	) => {
		const updateQuery: symptomDetailsType = {
			...data,
			id: props.id,
			owner_id: currentUser ? currentUser.uid : "no one",
		}

		return updateItem("symptoms", updateQuery)
	}

	const handleDelete = async () => {
		return deleteItem("symptoms", props.id)
	}

	const handleBack = () => {
		router.push(`/symptom/${props.id}`)
	}

	let content = (
		<Flex direction="column" w="full">
			<Header
				title="Edit Symptom"
				buttonName="None"
				itemId={props.id}
				onBack={handleBack}
			/>
			<SymptomForm
				buttonName="Save Changes"
				symptom={props}
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
				<title>Edit Symptom #{props.id} | IT Ticketing</title>
				<meta
					name="description"
					content={`Edit Symptom No.${props.id}`}
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					property="og:title"
					content={`Edit Symptom #${props.id} | IT Ticketing`}
				/>
				<meta
					property="og:description"
					content={`Edit Symptom No.${props.id}`}
				/>
				<meta
					property="og:image"
					content="https://it-ticketing.vercel.app/it_department.png"
				/>
			</Head>

			{content}
		</>
	)
}

export async function getStaticPaths() {
	const paths = await getAllCollectionItems("symptoms", "id")

	return {
		paths,
		fallback: "blocking",
	}
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const symptomData = await getItemData("symptoms", params.id)

	// Symptom does not exist
	if (!symptomData.owner_id) {
		return {
			notFound: true,
			revalidate: 5,
		}
	}

	return {
		props: {
			...symptomData,
		},
		revalidate: 5,
	}
}
