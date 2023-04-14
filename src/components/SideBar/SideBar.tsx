import { Flex, Icon, Stack } from "@chakra-ui/react"
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
import UserItem from "./UserItem"

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

export default function SideBar() {
	return (
		<Flex
			as="nav"
			direction={{ base: "row", md: "column" }}
			h="full"
			boxShadow="gray"
			gap="4"
			alignItems="center"
			bg="darkBlue"
			py={{ base: 0, md: 5 }}
			px={{ base: 2, md: 0 }}
		>
			<Icon
				h="50px"
				w="50px"
				m="4"
				color="whiteAlpha.900"
				as={HiOutlineWrenchScrewdriver}
			/>
			<Stack
				direction={{ base: "row", md: "column" }}
				w={{ base: "70%", md: "full" }}
				h="full"
			>
				{sideItems.map((sideItem) => (
					<SideItem {...sideItem} key={sideItem.pagePath} />
				))}
			</Stack>
			<UserItem />
		</Flex>
	)
}
