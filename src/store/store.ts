import { departmentDetailsType } from "@/types/departmentTypes"
import { symptomDetailsType } from "@/types/symptomTypes"
import { techDetailsType } from "@/types/techTypes"
import { ticketDetailsType } from "@/types/ticketTypes"
import { type User } from "firebase/auth"
import { atom } from "jotai"

export const currentUserAtom = atom<User | false | undefined>(undefined)

export const alertStateAtom = atom<{
	visible: boolean
	status: "success" | "error"
	text: string
}>({ visible: false, status: "success", text: "" })

export const ticketsAtom = atom<ticketDetailsType[] | undefined>(undefined)

export const symptomsAtom = atom<symptomDetailsType[] | undefined>(undefined)

export const techsAtom = atom<techDetailsType[] | undefined>(undefined)

export const departmentsAtom = atom<departmentDetailsType[] | undefined>(
	undefined
)
