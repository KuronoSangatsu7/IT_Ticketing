import { Grid, GridItem, Link, Divider, Box } from "@chakra-ui/react"
import { techDetailsType } from "@/types/techTypes"
import { EmailIcon, ChevronRightIcon } from "@chakra-ui/icons"
import NextLink from "next/link"

export default function Tech(techDetails: techDetailsType) {
	return (
		<>
			<Link
				as={NextLink}
				href={`/tech/${techDetails.id}`}
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
					rowGap={4}
					fontSize={{ base: "xl", lg: "md" }}
					letterSpacing={{ base: "wider", lg: "tight" }}
					alignItems="center"
				>
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
							Tech Name:
						</Box>
						{techDetails.full_name}
					</GridItem>
					<GridItem
						colSpan={2}
						display={{ base: "none", lg: "block" }}
					>
						{<EmailIcon color="blackAlpha.600" />}
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
						{techDetails.department}
					</GridItem>
					<GridItem
						colSpan={{ base: 2, lg: 3 }}
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
							Assigned Tickets:
						</Box>
						<Box as="span" pl='40px' fontWeight='extrabold'>
							{techDetails.assigned_tickets}
						</Box>
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
