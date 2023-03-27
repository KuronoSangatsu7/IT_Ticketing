import { Link, Icon } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { IconType } from "react-icons"

type sideItemProps = {
	pagePath: string
	pageTitle: string
	inactiveIcon: IconType
	activeIcon: IconType
}

export default function SideItem({
	pagePath,
	pageTitle,
	activeIcon,
	inactiveIcon,
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
			flexDirection={{ base: "column" }}
			borderTopLeftRadius="lg"
			borderBottomLeftRadius={{ md: "lg" }}
			borderTopRightRadius={{ base: "lg", md: "none" }}
			gap="2"
			w="70%"
			alignSelf="end"
			_hover={{}}
		>
			<Icon as={activeIcon} color="whiteAlpha.900" h="35px" w="35px" />
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
			w="70%"
			borderLeftRadius="lg"
			alignSelf="center"
			_hover={{}}
		>
			<Icon as={inactiveIcon} color="whiteAlpha.900" h="35px" w="35px" />
		</Link>
	)
}
