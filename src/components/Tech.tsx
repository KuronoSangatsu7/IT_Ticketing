import { Grid, GridItem, Link, Divider } from "@chakra-ui/react"
import { techDetailsType } from "@/types/techTypes"
import { EmailIcon, ChevronRightIcon } from "@chakra-ui/icons"
import NextLink from "next/link"

export default function Tech(techDetails: techDetailsType) {
	return (
		<>
			<Link
				as={NextLink}
				href="/"
				paddingY="15px"
				paddingX="25px"
				_hover={{ bg: "blackAlpha.200" }}
			>
				<Grid templateColumns="repeat(20, 1fr)" columnGap={1}>
					<GridItem colSpan={2}>{techDetails.full_name}</GridItem>
					<GridItem colSpan={1}>
						{<EmailIcon color="blackAlpha.600" />}
					</GridItem>
					<GridItem colSpan={2}>{techDetails.department}</GridItem>
					<GridItem colSpan={3}>
						Assigned Tickets ({techDetails.assigned_tickets})
					</GridItem>
					<GridItem colStart={20}>
						<ChevronRightIcon />
					</GridItem>
				</Grid>
			</Link>
			<Divider borderColor="blackAlpha.400" />
		</>
	)
}
