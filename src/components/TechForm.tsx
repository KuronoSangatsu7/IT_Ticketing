import useAlert from "@/hooks/use-alert"
import { departmentsAtom } from "@/store/store"
import { type techDetailsType } from "@/types/techTypes"
import {
	Box,
	FormControl,
	FormErrorMessage,
	Button,
	Input,
	Select,
	useDisclosure,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
} from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import FormItemLabel from "./FormItemLabel"

type Inputs = {
	full_name: string
	email: string
	department: string
}

export default function TechForm(props: {
	tech?: techDetailsType
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
			full_name: props.tech ? props.tech.full_name : "",
			email: props.tech ? props.tech.email : "",
			department: props.tech ? props.tech.department : "",
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
					text: "Tech info updated successfully",
				})
				router.push("/techs")
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
						text: "Tech info deleted successfully",
					})
					router.push("/techs")
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
			<FormControl isInvalid={errors.full_name && true}>
				<FormItemLabel htmlFor="full_name" text="Tech Full Name" />
				<Input
					id="full_name"
					placeholder="Justin Sample"
					{...register("full_name", {
						required: "This is required",
						pattern: {
							value: /^[a-zA-Z]{2,} [a-zA-Z]{2,}$/,
							message:
								"Please use the format *<First Name> <Last Name>* each of which should be at least 2 characters.",
						},
					})}
				/>
				<FormErrorMessage>
					{errors.full_name && errors.full_name.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.email && true}>
				<FormItemLabel htmlFor="email" text="Email" />
				<Input
					id="email"
					placeholder="email@fakeitcompany.com"
					{...register("email", {
						required: "This is required",
						pattern: {
							value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
							message: "Please use a valid company email.",
						},
					})}
				/>
				<FormErrorMessage>
					{errors.email && errors.email.message}
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

			<FormControl>
				<FormItemLabel
					htmlFor="assigned_tickets"
					text="Assigned Tickets"
				/>
				<Box fontWeight="bold">
					{props.tech ? props.tech.assigned_tickets : 0}
				</Box>
			</FormControl>

			<Button colorScheme="teal" isLoading={isSubmitting} type="submit">
				{props.buttonName ? props.buttonName : "Add Tech"}
			</Button>

			<Button
				display={props.tech ? "block" : "none"}
				colorScheme="red"
				onClick={onOpen}
			>
				Remove Tech
			</Button>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Tech
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure you want to delete this tech? You
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
