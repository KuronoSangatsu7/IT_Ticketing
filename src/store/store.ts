import { ticketDetailsType } from "@/types/ticketTypes"
import { type User } from "firebase/auth"
import { atom } from "jotai"

export const currentUserAtom = atom<User | undefined>(undefined)
