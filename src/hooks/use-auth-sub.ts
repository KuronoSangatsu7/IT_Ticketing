import { currentUserAtom } from "@/store/store"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useAtom } from "jotai"

const useAuthSub = () => {
	const auth = getAuth()
	const [, setCurrentUser] = useAtom(currentUserAtom)

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setCurrentUser(user)
		} else {
			setCurrentUser(false)
		}
	})
}

export default useAuthSub
