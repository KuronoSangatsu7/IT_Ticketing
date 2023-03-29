import TechForm from "@/components/TechForm"
import { Flex } from "@chakra-ui/react"
import Header from "@/components/Header"

export default function NewTech() {
	return (
		<Flex direction="column" w="full">
			<Header title="New Tech" buttonName="None" />
			<TechForm />
		</Flex>
	)
}
