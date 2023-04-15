import { Grid, GridItem, Link, Divider, Box } from "@chakra-ui/react"
import { symptomDetailsType } from "@/types/symptomTypes"
import { ChevronRightIcon } from "@chakra-ui/icons"
import NextLink from "next/link"

export default function Symptom(symptomDetails: symptomDetailsType) {
	return (
		<>
			<Link
				aria-label={`Symptom ${symptomDetails.id}`}
				as={NextLink}
				href={`/symptom/${symptomDetails.id}`}
				paddingY="15px"
				paddingX="25px"
				borderRadius={{ base: "lg", lg: "none" }}
				_hover={{ bg: "blackAlpha.200" }}
				w={{ base: "80%", lg: "full" }}
				alignSelf="center"
				my={{ base: "5px", lg: "0" }}
				shadow={{ base: "gray", lg: "none" }}
			>
				<Grid
					templateColumns={{
						base: "repeat (2, 1fr)",
						lg: "repeat(20, 1fr)",
					}}
					columnGap={1}
					fontSize={{ base: "xl", lg: "md" }}
					letterSpacing={{ base: "wider", lg: "tight" }}
					alignItems="center"
					rowGap={4}
				>
					<GridItem
						colSpan={{ base: 2, lg: 6 }}
						display="flex"
						flexDirection="column"
					>
						<Box
							display={{ base: "block", lg: "none" }}
							fontWeight="medium"
							fontSize="sm"
							color="gray.500"
							letterSpacing="tight"
						>
							Symptom:
						</Box>
						{symptomDetails.name}
					</GridItem>
					<GridItem
						colSpan={{ base: 2, lg: 4 }}
						display="flex"
						flexDirection="column"
					>
						<Box
							display={{ base: "block", lg: "none" }}
							fontWeight="medium"
							fontSize="sm"
							color="gray.500"
							letterSpacing="tight"
						>
							Department:
						</Box>
						{symptomDetails.department}
					</GridItem>
					<GridItem
						colStart={20}
						display={{ base: "none", lg: "block" }}
					>
						<ChevronRightIcon />
					</GridItem>
				</Grid>
			</Link>
			<Divider
				borderColor="blackAlpha.400"
				display={{ base: "none", lg: "block" }}
			/>
		</>
	)
}
