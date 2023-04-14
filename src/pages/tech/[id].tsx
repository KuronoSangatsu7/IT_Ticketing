import Header from "@/components/Header"
import { getAllCollectionItems, getItemData } from "@/lib/tickets"
import { currentUserAtom } from "@/store/store"
import { techDetailsType } from "@/types/techTypes"
import { Flex, Box, useAccordion } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useRouter } from "next/router"

export default function Tech(params: techDetailsType) {
	const techFields = [
		{ fieldName: "Name", fieldData: params.full_name },
		{ fieldName: "Department", fieldData: params.department },
		{ fieldName: "IT Email", fieldData: params.email },
		{ fieldName: "Assigned Tickets", fieldData: params.assigned_tickets },
	]

	const router = useRouter()
	const [currentUser] = useAtom(currentUserAtom)

	const handleClick = () => {
		router.push(`/tech/edit/${params.id}`)
	}

	const handleBack = () => {
		router.push('/techs')
	}

	return (
		<Flex direction="column" w="full">
			<Header
				title="Tech"
				itemId={params.id}
				buttonName={
					currentUser
						? currentUser.uid == params.owner_id
							? "Edit Tech"
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
				{techFields.map((field) => (
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
	const paths = await getAllCollectionItems("techs", "id")

	return {
		paths,
		fallback: 'blocking',
	}
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const techData = await getItemData("techs", params.id)

	// Tech does not exist
	if(!techData.owner_id){
        return{
            notFound: true,
            revalidate: 5
        }
    }

	return {
		props: {
			...techData,
		},
		revalidate: 5,
	}
}
