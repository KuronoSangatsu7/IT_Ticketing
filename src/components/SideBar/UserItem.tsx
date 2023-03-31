import { currentUserAtom } from "@/store/store"
import { useAtom } from "jotai"
import {
	Avatar,
	Link,
	Menu,
	MenuButton,
	MenuGroup,
	MenuItem,
	MenuList,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { signInUser, signOutUser } from "@/lib/tickets"
import { GoogleAuthProvider } from "firebase/auth"

export default function UserItem() {
	const [currentUser, setCurrentUser] = useAtom(currentUserAtom)

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

	const handleSignOut = () => {
		signOutUser()
			.then(() => {
				setCurrentUser(undefined)
			})
			.catch((error) => {})
	}

	return (
		<Menu>
			<MenuButton>
				{currentUser ? (
					<Avatar
						name={
							currentUser.displayName
								? currentUser.displayName
								: ""
						}
						src={
							currentUser.photoURL
								? currentUser.photoURL
								: undefined
						}
					/>
				) : (
					<Avatar />
				)}
			</MenuButton>
			<MenuList>
				{currentUser != undefined ? (
					<>
						<MenuGroup title="Manage">
							<MenuItem>
								<Link
									as={NextLink}
									href="/tickets"
									_hover={{ textDecoration: "none" }}
								>
									My Tickets
								</Link>
							</MenuItem>
						</MenuGroup>
						<MenuGroup title="Settings"><MenuItem onClick={handleSignOut}>Sign Out</MenuItem></MenuGroup>
						
					</>
				) : (
					<MenuItem onClick={handleSignIn}>Sign In</MenuItem>
				)}
			</MenuList>
		</Menu>
	)
}
