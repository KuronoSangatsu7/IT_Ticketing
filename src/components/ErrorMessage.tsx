import { VStack } from "@chakra-ui/react"

export default function ErrorMessage() {
	return (
		<VStack fontSize="xl" mt="200px">
			<div>Something went wrong :\</div>
			<div>Please check back later</div>
		</VStack>
	)
}
