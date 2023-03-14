import { Divider, Flex, Heading, Box, Icon, Spacer } from "@chakra-ui/react"
import SideItem from "./SideItem"
import {
	HiOutlineAtSymbol,
	HiOutlineTicket,
	HiOutlineHome,
	HiOutlineEmojiSad,
	HiOutlineUserGroup,
	HiOutlineChartSquareBar,
} from "react-icons/hi"

const sideItems = [
	{ pageTitle: "Home", pagePath: "/", icon: HiOutlineHome },
	{ pageTitle: "Tickets", pagePath: "/tickets", icon: HiOutlineTicket },
	{ pageTitle: "Symptoms", pagePath: "/symptoms", icon: HiOutlineEmojiSad },
	{ pageTitle: "Techs", pagePath: "/techs", icon: HiOutlineUserGroup },
	{
		pageTitle: "Analytics",
		pagePath: "/analytics",
		icon: HiOutlineChartSquareBar,
	},
]

export default function SideBar() {
	return (
		<Flex
			as="aside"
			direction="column"
			borderRight="1px"
			borderColor="blackAlpha.400"
			h="full"
			boxShadow="gray"
			gap='4'
		>
			<Box display="flex" alignItems='center' gap="2" pl="2" pt='5' pb='5' borderTopWidth='10px' borderTopColor='cyan.700' >
				<Icon
					as={HiOutlineAtSymbol}
					h="35px"
					w="35px"
					color="blackAlpha.700"
				/>
				<Heading fontWeight='light' ml="5" letterSpacing="wide">
					IT Ticketing
				</Heading>
			</Box>
			<Box>
				{sideItems.map((sideItem) => (
					<SideItem {...sideItem} key={sideItem.pagePath} />
				))}
			</Box>
		</Flex>
	)
}
