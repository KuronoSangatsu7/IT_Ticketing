import Header from "@/components/UI/Header"
import { getAllCollectionItems, getItemData } from "@/lib/firebaseComms"
import { currentUserAtom } from "@/store/store"
import { symptomDetailsType } from "@/types/symptomTypes"
import { Flex, Box } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import Head from "next/head"

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
		<>
			<Head>
				<title>Symptom #{params.id} | IT Ticketing</title>
				<meta
					name="description"
					content={`Symptom No.${params.id}\n Department: ${params.department}`}
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					property="og:title"
					content={`Symptom #${params.id} | IT Ticketing`}
				/>
				<meta
					property="og:description"
					content={`Symptom No.${params.id}\n Department: ${params.department}`}
				/>
				<meta
					property="og:image"
					content="https://it-ticketing.vercel.app/it_department.png"
				/>
			</Head>

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
