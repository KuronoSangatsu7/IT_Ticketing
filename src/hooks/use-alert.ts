import { alertStateAtom } from "@/store/store"
import { useAtom } from "jotai"
const useAlert = () => {
	const [, setAlertState] = useAtom(alertStateAtom)

	const showAlert = (alertProps: {
		status: "success" | "error"
		text: string
	}) => {
		setAlertState({ ...alertProps, visible: true })
		setTimeout(() => setAlertState({ ...alertProps, visible: false }), 3000)
	}

	return {
		showAlert,
	}
}

export default useAlert
