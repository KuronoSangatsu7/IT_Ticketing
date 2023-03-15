import {
	Divider,
	Flex,
	Heading,
	Box,
	Icon,
	Spacer,
	VStack,
} from "@chakra-ui/react"
import SideItem from "./SideItem"
import {
	HiTicket,
	HiOutlineTicket,
	HiHome,
	HiOutlineHome,
	HiEmojiSad,
	HiOutlineEmojiSad,
	HiUserGroup,
	HiOutlineUserGroup,
	HiChartSquareBar,
	HiOutlineChartSquareBar,
} from "react-icons/hi"

import { HiOutlineWrenchScrewdriver } from "react-icons/hi2"

const sideItems = [
	{
		pageTitle: "Home",
		pagePath: "/",
		inactiveIcon: HiOutlineHome,
		activeIcon: HiHome,
	},
	{
		pageTitle: "Tickets",
		pagePath: "/tickets",
		inactiveIcon: HiOutlineTicket,
		activeIcon: HiTicket,
	},
	{
		pageTitle: "Symptoms",
		pagePath: "/symptoms",
		inactiveIcon: HiOutlineEmojiSad,
		activeIcon: HiEmojiSad,
	},
	{
		pageTitle: "Techs",
		pagePath: "/techs",
		inactiveIcon: HiOutlineUserGroup,
		activeIcon: HiUserGroup,
	},
	{
		pageTitle: "Analytics",
		pagePath: "/analytics",
		inactiveIcon: HiOutlineChartSquareBar,
		activeIcon: HiChartSquareBar,
	},
]

const hovered = false

export default function SideBar() {
	return (
		<Flex
			as="aside"
			direction="column"
			h="full"
			boxShadow="gray"
			gap="4"
			alignItems="center"
			bg="darkBlue"
		>
			<Icon
				h="50px"
				w="50px"
				m="4"
				color="whiteAlpha.900"
				as={HiOutlineWrenchScrewdriver}
			/>
			<VStack w="full">
				{sideItems.map((sideItem) => (
					<SideItem
						{...sideItem}
						expanded={hovered}
						key={sideItem.pagePath}
					/>
				))}
			</VStack>
		</Flex>
	)
}
