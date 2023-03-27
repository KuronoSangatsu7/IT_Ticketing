import app from "./firebaseInit"
import {
	getFirestore,
	collection,
	getDocs,
	doc,
	getDoc,
	onSnapshot,
	type QueryDocumentSnapshot,
	type DocumentData,
	type DocumentReference,
} from "firebase/firestore"
import { ticketDetailsType } from "@/types/ticketTypes"
import { symptomDetailsType } from "@/types/symptomTypes"
import { techDetailsType } from "@/types/techTypes"

const mapItemToId = (item: QueryDocumentSnapshot<DocumentData>) => {
	return {
		params: {
			id: item.id,
		},
	}
}

export async function getAllCollectionItems(
	collectionName: "tickets" | "symptoms" | "techs" | "departments",
	queryType: "id" | "data"
) {
	const db = getFirestore(app)
	const itemColl = collection(db, collectionName)
	const itemSnapshot = await getDocs(itemColl)
	const queryAnswer:
		| { params: { id: string } }[]
		| Promise<ticketDetailsType | symptomDetailsType | techDetailsType>[] =
		queryType == "id"
			? itemSnapshot.docs.map(mapItemToId)
			: itemSnapshot.docs.map((item) =>
					getItemData(collectionName, item.id)
			  )
	return queryAnswer
}

// export async function getAllTicketIds() {
// 	const db = getFirestore(app)

// 	const ticketsColl = collection(db, "tickets")
// 	const ticketsSnapshot = await getDocs(ticketsColl)
// 	const ticketIdList = ticketsSnapshot.docs.map((doc) => {
// 		return { params: { id: doc.id } }
// 	})

// 	return ticketIdList
// }

export async function getItemData(
	collectionName: "tickets" | "symptoms" | "techs" | "departments",
	id: string
) {
	const db = getFirestore(app)
	const docRef = doc(db, collectionName, id)
	const docSnap = await getDoc(docRef)
	const docData = docSnap.data() as
		| Omit<ticketDetailsType, "id">
		| Omit<symptomDetailsType, "id">
		| Omit<techDetailsType, "id">

	return {
		id: id,
		...docData,
	}
}

// export async function getTicketData(id: string) {
// 	const db = getFirestore(app)
// 	const docRef = doc(db, "tickets", id)
// 	const docSnap = await getDoc(docRef)
// 	const docData = docSnap.data()

// 	return {
// 		id: id,
// 		...docData,
// 	}
// }
