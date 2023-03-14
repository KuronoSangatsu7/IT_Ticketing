import { Button } from "@chakra-ui/react"

interface navItemProps {
	text: string
	status: boolean
}

export function NavItem({ text, status }: navItemProps) {
	return status ? (
		<Button w="full" borderRadius="0" borderBottom='2px' borderBottomColor='cyan.700' bg='cyan.50' textColor='cyan.700' fontWeight='bold'>
			{text}
		</Button>
	) : (
        <Button w="full" borderRadius="0" fontWeight='bold' textColor='blackAlpha.600' >
			{text}
		</Button>
    )
}
