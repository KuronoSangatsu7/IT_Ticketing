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
import useAuthSub from "@/hooks/use-auth-sub"

export default function UserItem() {
	const [currentUser] = useAtom(currentUserAtom)
	useAuthSub()

	const handleSignIn = () => {
		signInUser()
	}

	const handleSignOut = () => {
		signOutUser()
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
				{currentUser ? (
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
