import { Link, Box, Icon } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

type sideItemProps = {
	pagePath: string
	pageTitle: string
}

export default function SideItem({ pagePath, pageTitle }: sideItemProps) {
	const router = useRouter()

	return router.pathname == pagePath ? (
		<Link
			as={NextLink}
			href={pagePath}
			bg="teal.50"
			h="50px"
			display="flex"
			alignItems="center"
			_hover={{}}
		>
			<Box h="100%" w="5px" bg="teal.600"></Box>
			<Box p="5px" textColor="teal.600" fontWeight="extrabold">
				{pageTitle}
			</Box>
		</Link>
	) : (
		<Link as={NextLink} href={pagePath} _hover={{}} fontWeight="extrabold">
			<Box>{pageTitle}</Box>
		</Link>
	)
}
