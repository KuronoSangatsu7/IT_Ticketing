import useAlert from "@/hooks/use-alert"
import { departmentsAtom } from "@/store/store"
import { type symptomDetailsType } from "@/types/symptomTypes"
import {
	Box,
	FormControl,
	FormErrorMessage,
	Button,
	Input,
	Select,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	useDisclosure,
} from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import FormItemLabel from "./FormItemLabel"

type Inputs = {
	name: string
	department: string
}

export default function SymptomForm(props: {
	symptom?: symptomDetailsType
	buttonName?: string
	onSubmit: (data: Inputs) => Promise<void>
	onDelete?: () => Promise<void>
}) {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>({
		defaultValues: {
			name: props.symptom ? props.symptom.name : "",
			department: props.symptom ? props.symptom.department : "",
		},
	})

	const [departments] = useAtom(departmentsAtom)

	const router = useRouter()
	const { showAlert } = useAlert()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef() as React.RefObject<HTMLButtonElement>

	const onSubmit = async (data: Inputs) => {
		props
			.onSubmit(data)
			.then(() => {
				showAlert({
					status: "success",
					text: "Symptom updated successfully",
				})
				router.push("/symptoms")
			})
			.catch((e) =>
				showAlert({
					status: "error",
					text: "Operation failed. Please try again later",
				})
			)
	}

	const handleDelete = () => {
		props.onDelete &&
			props
				.onDelete()
				.then(() => {
					showAlert({
						status: "success",
						text: "Symptom deleted successfully",
					})
					router.push("/symptoms")
				})
				.catch((e) =>
					showAlert({
						status: "error",
						text: "Operation failed. Please try again later",
					})
				)
	}

	return (
		<Box
			as="form"
			onSubmit={handleSubmit(onSubmit)}
			display="flex"
			flexDirection="column"
			w={{ base: "90%", lg: "40%" }}
			gap="15px"
			fontSize="lg"
			alignSelf="center"
			paddingY="20px"
		>
			<FormControl isInvalid={errors.name && true}>
				<FormItemLabel htmlFor="name" text="Symptom Name" />
				<Input
					id="name"
					placeholder="Computer wont turn on"
					{...register("name", {
						required: "This is required",
						minLength: {
							value: 5,
							message: "Minimum length should be 5",
						},
					})}
				/>
				<FormErrorMessage>
					{errors.name && errors.name.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.department && true}>
				<FormItemLabel htmlFor="department" text="Department" />
				<Controller
					control={control}
					name="department"
					key="department"
					defaultValue=""
					rules={{ required: "This is required." }}
					render={({ field: { onChange, value, ref } }) => (
						<Select
							onChange={onChange}
							ref={ref}
							value={value}
							placeholder="Choose a department"
						>
							{departments?.map((department) => (
								<option
									key={department.id}
									value={department.name}
								>
									{department.name}
								</option>
							))}
						</Select>
					)}
				/>

				<FormErrorMessage>
					{errors.department && errors.department.message}
				</FormErrorMessage>
			</FormControl>

			<Button colorScheme="teal" isLoading={isSubmitting} type="submit">
				{props.buttonName ? props.buttonName : "Add Symptom"}
			</Button>

			<Button
				display={props.symptom ? "block" : "none"}
				colorScheme="red"
				onClick={onOpen}
			>
				Remove Symptom
			</Button>
			
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Symptom
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure you want to delete this symptom? You
							cannot undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button
								colorScheme="red"
								onClick={handleDelete}
								ml={3}
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>

		</Box>
	)
}
