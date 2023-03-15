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
			<Box display="flex" alignItems='center' gap="2" p='3' pb='0' borderTopWidth='10px' borderTopColor='cyan.700' justifyContent='space-between'>
				
				<Heading fontWeight='light' letterSpacing="wide">
					IT Ticketing
				</Heading>
			</Box>
			
			<Divider />

			<Box>
				{sideItems.map((sideItem) => (
					<SideItem {...sideItem} key={sideItem.pagePath} />
				))}
			</Box>
		</Flex>
	)
}
