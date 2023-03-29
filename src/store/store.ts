import { ticketDetailsType } from "@/types/ticketTypes"
import { atom } from "jotai"

export const currentTicketAtom = atom<ticketDetailsType>({
	assigned_tech: "",
	department: "",
	description: "",
	email: "",
	employee_id: "",
	first_name: "",
	last_name: "",
	notes: "",
	resolved: false,
	symptom: "",
	id: "",
})
