import { Grid, GridItem, Link, Divider } from "@chakra-ui/react"
import { symptomDetailsType } from "@/types/symptomTypes"
import { ChevronRightIcon } from "@chakra-ui/icons"
import NextLink from "next/link"

export default function Symptom(symptomDetails: symptomDetailsType) {
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
					<GridItem colSpan={5}>{symptomDetails.symptom}</GridItem>
					<GridItem colSpan={4}>{symptomDetails.department}</GridItem>
					<GridItem colStart={20}>
						<ChevronRightIcon />
					</GridItem>
				</Grid>
			</Link>
			<Divider borderColor="blackAlpha.400" />
		</>
	)
}
