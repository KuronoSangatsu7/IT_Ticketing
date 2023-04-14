import Header from "@/components/Header"
import { getAllCollectionItems, getItemData } from "@/lib/tickets"
import { currentUserAtom } from "@/store/store"
import { symptomDetailsType } from "@/types/symptomTypes"
import { Flex, Box } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useRouter } from "next/router"

export default function Symptom(params: symptomDetailsType) {
	const symptomFields = [
		{ fieldName: "Name", fieldData: params.name },
		{ fieldName: "Department", fieldData: params.department },
	]

	const [currentUser] = useAtom(currentUserAtom)

	const router = useRouter()

	const handleClick = () => {
		router.push(`/symptom/edit/${params.id}`)
	}

	const handleBack = () => {
		router.push("/symptoms")
	}

	return (
		<Flex direction="column" w="full">
			{}
			<Header
				title="Symptom"
				itemId={params.id}
				buttonName={
					currentUser
						? currentUser.uid == params.owner_id
							? "Edit Symptom"
							: "None"
						: "None"
				}
				buttonIcon="Edit"
				onClick={handleClick}
				onBack={handleBack}
			/>
			<Flex
				flexDirection="column"
				w={{ base: "90%", lg: "40%" }}
				gap="15px"
				fontSize="lg"
				alignSelf="center"
				paddingY="20px"
			>
				{symptomFields.map((field) => (
					<Flex flexDirection="column" key={field.fieldName}>
						<Box
							as="span"
							fontWeight="medium"
							fontSize="xs"
							color="gray.500"
							letterSpacing="tight"
						>
							{field.fieldName}
						</Box>
						{field.fieldData}
					</Flex>
				))}
			</Flex>
		</Flex>
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
	if(!symptomData.owner_id){
        return{
            notFound: true,
            revalidate: false
        }
    }

	return {
		props: {
			...symptomData,
		},
		revalidate: 5,
	}
}
