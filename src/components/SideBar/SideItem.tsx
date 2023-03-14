import { Link, Box, Icon } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { IconType } from "react-icons"

type sideItemProps = {
	pagePath: string
	pageTitle: string
	icon: IconType
}

export default function SideItem({ pagePath, pageTitle, icon }: sideItemProps) {
	const router = useRouter()

	return router.pathname == pagePath ? (
		<Link
			as={NextLink}
			href={pagePath}
			bg="cyan.50"
			h="50px"
			display="flex"
			alignItems="center"
			gap="2"
			_hover={{}}
		>
			<Box h="100%" w="5px" bg="cyan.700" />
			<Icon as={icon} color="cyan.700" h="20px" w="20px" />
			<Box p="5px" textColor="cyan.700" fontWeight="bold">
				{pageTitle}
			</Box>
		</Link>
	) : (
		<Link
			as={NextLink}
			href={pagePath}
			h="50px"
			display="flex"
			alignItems="center"
			gap="2"
			_hover={{}}
		>
			<Box h="100%" w="5px" bg="white" />
			<Icon as={icon} color="blackAlpha.600" h="20px" w="20px" />
			<Box p="5px" textColor="blackAlpha.600" fontWeight="bold">
				{pageTitle}
			</Box>
		</Link>
	)
}
