import { Box, Grid, GridItem, Divider } from "@chakra-ui/react"

export default function TechLabel() {
	return (
		<>
			<Box
				paddingY="15px"
				paddingX="25px"
				fontWeight="medium"
				fontSize="sm"
				color="gray.500"
				display={{ base: "none", lg: "block" }}
			>
				<Grid
					templateColumns="repeat(20, 1fr)"
					columnGap={1}
					letterSpacing="tight"
				>
					<GridItem colSpan={4}>Name</GridItem>
					<GridItem colSpan={2}>IT Email</GridItem>
					<GridItem colSpan={4}>Department</GridItem>
					<GridItem colSpan={3}>Assigned Tickets</GridItem>
				</Grid>
			</Box>
			<Divider borderColor="blackAlpha.400"  display={{base: 'none', lg: 'block'}}/>
		</>
	)
}
