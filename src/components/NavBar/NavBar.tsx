import { Flex } from "@chakra-ui/react"
import { NavItem } from "./NavItem"

export default function NavBar() {
	return (
		<Flex>
			<NavItem text="All Tickets" status={true} />
			<NavItem text="My Tickets" status={false} />
		</Flex>
	)
}
