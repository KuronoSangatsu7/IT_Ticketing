import { Flex, Heading, Spacer, Button, Divider, VStack } from "@chakra-ui/react"

export default function Header({ title }: { title: string }) {
	return (
		<VStack h="10%" p="4" alignItems="center" flexDirection='column' >
			<Flex w='full' paddingX='4'>
				<Heading>{title}</Heading>
				<Spacer></Spacer>
				<Button colorScheme='blue'>Click Me</Button>
			</Flex>
			<Spacer />
			<Divider w='95%' borderColor='blackAlpha.800' />
		</VStack>
	)
}
