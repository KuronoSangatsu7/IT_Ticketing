import { signInUser } from "@/lib/tickets"
import { currentUserAtom } from "@/store/store"
import { Button, Box } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { FcGoogle } from "react-icons/fc"

export default function SignInButton() {
	const [, setCurrentUser] = useAtom(currentUserAtom)

	const handleSignIn = () => {
		signInUser()
			.then((result) => {
				const user = result.user
				// IdP data available using getAdditionalUserInfo(result)
				setCurrentUser(user)
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code
				const errorMessage = error.message
				// The email of the user's account used.
				const email = error.customData.email
			})
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
