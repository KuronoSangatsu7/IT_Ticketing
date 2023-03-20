import { Search2Icon } from "@chakra-ui/icons"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"

export function SearchBar() {
	return (
		<InputGroup>
			<Input type="text" placeholder="Search..." />
			<InputRightElement pointerEvents="none">
				<Search2Icon color="gray.300" />
			</InputRightElement>
		</InputGroup>
	)
}
