import { Spinner } from "@chakra-ui/react"

export default function LoadingSpinner(props: { marginTop?: string }) {
	return (
		<Spinner
			alignSelf="center"
			mt={props.marginTop ? props.marginTop : "100px"}
			h="50px"
			w="50px"
			color="darkBlue"
		/>
	)
}
