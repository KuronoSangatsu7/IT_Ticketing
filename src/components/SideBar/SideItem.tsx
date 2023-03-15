import { Link, Box, Icon } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { IconType } from "react-icons"

type sideItemProps = {
	pagePath: string
	pageTitle: string
	inactiveIcon: IconType
	activeIcon: IconType
	expanded: boolean
}

export default function SideItem({
	pagePath,
	pageTitle,
	activeIcon,
	inactiveIcon,
	expanded,
}: sideItemProps) {
	const router = useRouter()

	return router.pathname == pagePath ? (
		<Link
			as={NextLink}
			href={pagePath}
			bg="activeItem"
			h="50px"
			display="flex"
			alignItems="center"
			justifyContent="center"
			gap="2"
			w='70%'
			borderLeftRadius="lg"
			alignSelf='end'
			_hover={{}}
		>
			<Icon as={activeIcon} color="whiteAlpha.900" h="35px" w="35px" />
			{expanded && (
				<Box p="5px" textColor="cyan.700" fontWeight="bold">
					{pageTitle}
				</Box>
			)}
		</Link>
	) : (
		<Link
		as={NextLink}
		href={pagePath}
		h="50px"
		display="flex"
		alignItems="center"
		justifyContent="center"
		gap="2"
		w='70%'
		borderLeftRadius="lg"
		_hover={{}}
		>
			<Icon as={inactiveIcon} color="whiteAlpha.900" h="35px" w="35px" />
			{expanded && (
				<Box p="5px" textColor="blackAlpha.600" fontWeight="bold">
					{pageTitle}
				</Box>
			)}
		</Link>
	)
}
