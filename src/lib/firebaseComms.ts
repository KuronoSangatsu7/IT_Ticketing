import app from "./firebaseInit"
import {
	getFirestore,
	collection,
	getDocs,
	doc,
	getDoc,
	getCountFromServer,
	query,
	where,
	type QueryDocumentSnapshot,
	type DocumentData,
	setDoc,
	addDoc,
	deleteDoc,
} from "firebase/firestore"
import { ticketDetailsType } from "@/types/ticketTypes"
import { symptomDetailsType } from "@/types/symptomTypes"
import { techDetailsType } from "@/types/techTypes"
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from "firebase/auth"

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

export async function getItemData(
	collectionName: "tickets" | "symptoms" | "techs" | "departments",
	id: string
) {
	const db = getFirestore(app)
	const docRef = doc(db, collectionName, id)
	const docSnap = await getDoc(docRef)
	let docData = docSnap.data() as
		| Omit<ticketDetailsType, "id">
		| Omit<symptomDetailsType, "id">
		| Omit<techDetailsType, "id">

	// When fetching techs, query tickets collection to get num of assigned tickets
	if (collectionName == "techs" && docData) {
		const coll = collection(db, "tickets")
		let techDetails = docData as Omit<techDetailsType, "id">
		const q = query(
			coll,
			where("assigned_tech", "==", techDetails.full_name)
		)
		const snapshot = await getCountFromServer(q)
		const count = snapshot.data().count
		techDetails = { ...techDetails, assigned_tickets: count }

		docData = { ...techDetails }
	}

	return {
		id: id,
		...docData,
	}
}

export async function updateItem(
	collectionName: "tickets" | "symptoms" | "techs" | "departments",
	newValues: ticketDetailsType | symptomDetailsType | techDetailsType
) {
	const db = getFirestore(app)
	const docId = newValues.id

	const docValues = Object.fromEntries(
		Object.entries(newValues).filter(([key]) => key != "id")
	)

	const updateTransaction = await setDoc(
		doc(db, collectionName, docId),
		docValues
	)

	return updateTransaction
}

export async function addItem(
	collectionName: "tickets" | "symptoms" | "techs" | "departments",
	newValues:
		| Omit<ticketDetailsType, "id">
		| Omit<symptomDetailsType, "id">
		| Omit<techDetailsType, "id">
) {
	const db = getFirestore(app)

	const docValues = Object.fromEntries(
		Object.entries(newValues).filter(([key]) => key != "id")
	)

	return addDoc(collection(db, collectionName), docValues).then(() => {
		return
	})
}

export async function deleteItem(
	collectionName: "tickets" | "symptoms" | "techs" | "departments",
	docId: string
) {
	const db = getFirestore(app)

	const deleteTransaction = await deleteDoc(doc(db, collectionName, docId))

	return deleteTransaction
}

export async function signInUser() {
	const provider = new GoogleAuthProvider()
	const auth = getAuth(app)
	auth.languageCode = "it"

	return signInWithPopup(auth, provider)
}

export async function signOutUser() {
	const auth = getAuth()

	return signOut(auth)
}
