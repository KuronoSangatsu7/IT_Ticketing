import { useEffect } from "react"
import {
	getFirestore,
	onSnapshot,
	query,
	collection,
	where,
	type Firestore,
	getCountFromServer,
} from "firebase/firestore"
import app from "@/lib/firebaseInit"
import { ticketDetailsType } from "@/types/ticketTypes"
import { useAtom } from "jotai"
import {
	departmentsAtom,
	symptomsAtom,
	techsAtom,
	ticketsAtom,
} from "@/store/store"
import { symptomDetailsType } from "@/types/symptomTypes"
import { techDetailsType } from "@/types/techTypes"
import { departmentDetailsType } from "@/types/departmentTypes"

const getTechTicketCount = async (db: Firestore, techName: string) => {
	const coll = collection(db, "tickets")
	const q = query(coll, where("assigned_tech", "==", techName))
	const snapshot = await getCountFromServer(q)
	const count = snapshot.data().count

	return count
}

const useFirebaseSub = (
	collectionName: "tickets" | "techs" | "symptoms" | "departments"
) => {
	const [, setTickets] = useAtom(ticketsAtom)
	const [, setSymptoms] = useAtom(symptomsAtom)
	const [, setTechs] = useAtom(techsAtom)
	const [, setDepartments] = useAtom(departmentsAtom)

	const db = getFirestore(app)
	const q = query(collection(db, collectionName))

	useEffect(() => {
		const unsubscribe = onSnapshot(q, async (querySnapshot) => {
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
				querySnapshot.forEach(async (doc) => {
					items.push({
						...doc.data(),
						id: doc.id,
					} as techDetailsType)
				})

				// Query db for assigned_tickets counts
				const ticketCounts: Promise<number>[] = []
				const techItems = items as techDetailsType[]

				techItems.forEach((item) =>
					ticketCounts.push(getTechTicketCount(db, item.full_name))
				)

				Promise.all(ticketCounts).then((resolvedCounts) =>
					setTechs(
						techItems.map((item, i) => {
							return {
								...item,
								assigned_tickets: resolvedCounts[i],
							}
						})
					)
				)

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
