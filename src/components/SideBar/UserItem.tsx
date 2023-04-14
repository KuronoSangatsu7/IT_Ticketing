import { currentUserAtom, ticketFilterAtom } from "@/store/store"
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
import { useRouter } from "next/router"

export default function UserItem() {
	const [currentUser] = useAtom(currentUserAtom)
	const [, setCurrentTicketFilter] = useAtom(ticketFilterAtom)

	const router = useRouter()

	// Subscribe to firebase auth state
	useAuthSub()

	const handleSignIn = () => {
		signInUser()
	}

	const handleSignOut = () => {
		signOutUser()
	}

	const handleNavigate = () => {
		setCurrentTicketFilter("my-tickets")
		router.push("/tickets")
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
							<MenuItem onClick={handleNavigate}>
								My Tickets
							</MenuItem>
						</MenuGroup>
						<MenuGroup title="Settings">
							<MenuItem onClick={handleSignOut}>
								Sign Out
							</MenuItem>
						</MenuGroup>
					</>
				) : (
					<MenuItem onClick={handleSignIn}>Sign In</MenuItem>
				)}
			</MenuList>
		</Menu>
	)
}
