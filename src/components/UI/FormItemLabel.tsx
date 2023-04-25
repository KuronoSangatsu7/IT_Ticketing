import { FormLabel } from "@chakra-ui/react"

export default function FormItemLabel(props: {
	htmlFor: string
	text: string
}) {
	return (
		<FormLabel
			fontWeight="medium"
			fontSize="xs"
			color="gray.500"
			letterSpacing="tight"
			htmlFor={props.htmlFor}
		>
			{props.text}
		</FormLabel>
	)
}
