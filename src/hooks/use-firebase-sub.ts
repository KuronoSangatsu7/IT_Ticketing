import { useEffect } from "react"
import { getFirestore, onSnapshot, query, collection } from "firebase/firestore"
import app from "@/lib/firebaseInit"
import { ticketDetailsType } from "@/types/ticketTypes"
import { useAtom } from "jotai"
import { symptomsAtom, techsAtom, ticketsAtom } from "@/store/store"
import { symptomDetailsType } from "@/types/symptomTypes"
import { techDetailsType } from "@/types/techTypes"

const useFirebaseSub = (collectionName: string) => {
	const [, setTickets] = useAtom(ticketsAtom)
	const [, setSymptoms] = useAtom(symptomsAtom)
	const [, setTechs] = useAtom(techsAtom)

	const db = getFirestore(app)
	const q = query(collection(db, collectionName))

	useEffect(() => {
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const items: Array<
				ticketDetailsType | techDetailsType | symptomDetailsType
			> = []

			if (collectionName == "tickets") {
				querySnapshot.forEach((doc) => {
					items.push({
						...doc.data(),
						id: doc.id,
					} as ticketDetailsType)
				})

				setTickets(items as ticketDetailsType[])
			} else if (collectionName == "symptoms") {
				querySnapshot.forEach((doc) => {
					items.push({
						...doc.data(),
						id: doc.id,
					} as symptomDetailsType)
				})

				setSymptoms(items as symptomDetailsType[])
			} else if (collectionName == "techs") {
				querySnapshot.forEach((doc) => {
					items.push({
						...doc.data(),
						id: doc.id,
					} as techDetailsType)
				})

				setTechs(items as techDetailsType[])
			}
		})

		return () => {
			unsubscribe()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}

export default useFirebaseSub
