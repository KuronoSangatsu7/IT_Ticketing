import { Grid, GridItem, Link } from "@chakra-ui/react"
import { symptomDetailsType } from "@/types/symptomTypes"
import { ChevronRightIcon } from "@chakra-ui/icons"
import NextLink from "next/link"

export default function (symptomDetails: symptomDetailsType) {
	return (
		<Link as={NextLink} href="/" p="8px" _hover={{ bg: "blackAlpha.200" }}>
			<Grid templateColumns="repeat(20, 1fr)" columnGap={1}>
				<GridItem colSpan={5}>{symptomDetails.symptom}</GridItem>
				<GridItem colSpan={4}>{symptomDetails.department}</GridItem>
				<GridItem colStart={20}>
					<ChevronRightIcon />
				</GridItem>
			</Grid>
		</Link>
	)
}
