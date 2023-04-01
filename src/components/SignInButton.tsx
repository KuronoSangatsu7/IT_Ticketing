import { signInUser } from "@/lib/tickets"
import { Button, Box } from "@chakra-ui/react"
import { FcGoogle } from "react-icons/fc"

export default function SignInButton() {
	const handleSignIn = () => {
		signInUser()
	}

	return (
		<Button
			display="flex"
			gap="6"
			bg="gray.200"
			_hover={{ bg: "gray.300" }}
			onClick={handleSignIn}
		>
			<FcGoogle /> <Box fontSize="lg">Sign In with Google </Box>
		</Button>
	)
}
