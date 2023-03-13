import { Flex, Heading } from "@chakra-ui/react"
import SideItem from "./SideItem"

const sideItems = [
	{ pageTitle: "Home", pagePath: "/" },
	{ pageTitle: "Tickets", pagePath: "/tickets" },
	{ pageTitle: "Symptoms", pagePath: "/symptoms" },
	{ pageTitle: "Techs", pagePath: "/techs" },
	{ pageTitle: "Analytics", pagePath: "/analytics" },
]

export default function SideBar() {
	return (
		<Flex as="aside" direction="column" gap="4">
			<Heading>IT Ticketing</Heading>
            {sideItems.map(sideItem => <SideItem {...sideItem} key={sideItem.pagePath} />)}
		</Flex>
	)
}
