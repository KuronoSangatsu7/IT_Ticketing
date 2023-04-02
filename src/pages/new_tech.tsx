import TechForm from "@/components/TechForm"
import { Flex } from "@chakra-ui/react"
import Header from "@/components/Header"
import { useAtom } from "jotai"
import { currentUserAtom } from "@/store/store"
import { techDetailsType } from "@/types/techTypes"
import { addItem } from "@/lib/tickets"

export default function NewTech() {
	const [currentUser] = useAtom(currentUserAtom)

	const handleSubmit = (data: Omit<techDetailsType, "id" | "owner_id" | "assigned_tickets">) => {
		const addQuery: Omit<techDetailsType, "id"> = {
			...data,
			assigned_tickets: 0,
			owner_id: currentUser ? currentUser.uid : "no one",
		}
		
		return addItem("techs", addQuery)
	}

	return (
		<Flex direction="column" w="full">
			<Header title="New Tech" buttonName="None" />
			<TechForm onSubmit={handleSubmit} />
		</Flex>
	)
}
