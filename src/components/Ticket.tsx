import { Box, Divider, Grid, GridItem, Link } from "@chakra-ui/react"
import { ticketDetailsType } from "@/types/ticketTypes"
import { EmailIcon, ChevronRightIcon } from "@chakra-ui/icons"
import NextLink from "next/link"

export default function (ticketDetails: ticketDetailsType) {
	return (
		<Link as={NextLink} href="/"  p='8px' _hover={{bg: "blackAlpha.200"}}>
            <Grid templateColumns='repeat(21, 1fr)' columnGap={1}>
                <GridItem colSpan={7}>{ticketDetails.description}</GridItem>
                <GridItem>{<EmailIcon color='blackAlpha.600' />}</GridItem>
                <GridItem>{ticketDetails.first_name}</GridItem>
                <GridItem>{ticketDetails.last_name}</GridItem>
                <GridItem>{ticketDetails.employee_id}</GridItem>
                <GridItem colSpan={3}>{ticketDetails.symptom}</GridItem>
                <GridItem colSpan={2}>{ticketDetails.department}</GridItem>
                <GridItem colSpan={2}>{ticketDetails.assigned_tech}</GridItem>
                <GridItem>{ticketDetails.resolved ? "Y" : "N"}</GridItem>
                <GridItem>{ticketDetails.notes}</GridItem>
                <GridItem><ChevronRightIcon /></GridItem>
            </Grid>
            
		</Link>
	)
}
