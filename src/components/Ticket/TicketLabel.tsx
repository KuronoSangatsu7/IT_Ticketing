import { Grid, GridItem, Box, Divider } from "@chakra-ui/react"

export default function TicketLabel() {
	return (
		<>
			<Box
				paddingY="15px"
				paddingX="25px"
				fontWeight='medium'
				fontSize='sm'
				color="gray.500"
				display={{base: 'none', lg: 'block'}}
			>
				<Grid
					templateColumns="repeat(10, 1fr)"
					columnGap={1}
					letterSpacing="tight"
				>
					<GridItem colSpan={2} minW="180px">
						Symptom
					</GridItem>
					<GridItem minW="75px" >First Name</GridItem>
					<GridItem minW="75px">Last Name</GridItem>
					<GridItem minW="75px">Employee ID</GridItem>
					<GridItem minW="75px">Contact Email</GridItem>
					<GridItem minW="120px">Department</GridItem>
					<GridItem minW="120px" >Assigned Tech</GridItem>
					<GridItem>Status</GridItem>
				</Grid>
			</Box>
			<Divider borderColor="blackAlpha.400" display={{base: 'none', lg: 'block'}} />
		</>
	)
}
