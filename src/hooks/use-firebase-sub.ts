import { useCallback, useEffect, useState } from "react"
import { getFirestore, onSnapshot, query, collection } from "firebase/firestore"
import app from "@/lib/firebaseInit"

const useFirebaseSub = (collectionName: string) => {
	const [reload, setReload] = useState(false)

	const db = getFirestore(app)
	const q = query(collection(db, collectionName))

	const unsubscribe = onSnapshot(q, (querySnapshot) => {
		setReload((prevReload) => !prevReload)
	})
	// eslint-disable-next-line react-hooks/exhaustive-deps

	return {
		reload,
	}
}

export default useFirebaseSub
