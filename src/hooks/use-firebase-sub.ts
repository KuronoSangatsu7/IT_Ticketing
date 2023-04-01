import { useEffect } from "react"
import { getFirestore, onSnapshot, query, collection } from "firebase/firestore"
import app from "@/lib/firebaseInit"
import { ticketDetailsType } from "@/types/ticketTypes"
import { useAtom } from "jotai"
import { departmentsAtom, symptomsAtom, techsAtom, ticketsAtom } from "@/store/store"
import { symptomDetailsType } from "@/types/symptomTypes"
import { techDetailsType } from "@/types/techTypes"
import { departmentDetailsType } from "@/types/departmentTypes"

const useFirebaseSub = (collectionName: "tickets" | "techs" | "symptoms" | "departments") => {
	const [, setTickets] = useAtom(ticketsAtom)
	const [, setSymptoms] = useAtom(symptomsAtom)
	const [, setTechs] = useAtom(techsAtom)
	const [, setDepartments] = useAtom(departmentsAtom)

	const db = getFirestore(app)
	const q = query(collection(db, collectionName))

	useEffect(() => {
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const items: Array<
				| ticketDetailsType
				| techDetailsType
				| symptomDetailsType
				| departmentDetailsType
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
			} else if (collectionName == "departments") {
				querySnapshot.forEach((doc) => {
					items.push({
						...doc.data(),
						id: doc.id,
					} as departmentDetailsType)
				})

				setDepartments(items as departmentDetailsType[])
			}
		})

		return () => {
			unsubscribe()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}

export default useFirebaseSub
