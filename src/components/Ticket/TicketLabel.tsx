import { Grid, GridItem, Box, Divider } from "@chakra-ui/react"

export default function TicketLabel() {
	return (
        <>
		<Box paddingY="15px" paddingX="25px" fontWeight='medium' fontSize='xs' color='gray.500'>
			<Grid templateColumns="repeat(21, 1fr)" columnGap={1} alignItems='start' justifyContent='start'>
				<GridItem colSpan={7}>Description</GridItem>
				<GridItem>Email</GridItem>
				<GridItem>First Name</GridItem>
				<GridItem>Last Name</GridItem>
				<GridItem>Employee ID</GridItem>
				<GridItem colSpan={3}>Symptom</GridItem>
				<GridItem colSpan={2}>Department</GridItem>
				<GridItem colSpan={2}>Assigned Tech</GridItem>
				<GridItem w='105px'>Status</GridItem>
			</Grid>
		</Box>
        <Divider borderColor="blackAlpha.400" />
        </>
	)
}
