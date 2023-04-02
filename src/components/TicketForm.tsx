import { deleteItem, updateItem } from "@/lib/tickets"
import {
	currentUserAtom,
	departmentsAtom,
	symptomsAtom,
	techsAtom,
} from "@/store/store"
import { type ticketDetailsType } from "@/types/ticketTypes"
import {
	Box,
	FormControl,
	FormErrorMessage,
	Button,
	Input,
	Checkbox,
	Select,
} from "@chakra-ui/react"
import { useAtom } from "jotai"
import { Controller, useForm } from "react-hook-form"
import FormItemLabel from "./FormItemLabel"

type Inputs = Omit<ticketDetailsType, "id" | "owner_id">

export default function TicketForm(props: {
	ticket?: ticketDetailsType
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
			description: props.ticket ? props.ticket.description : "",
			first_name: props.ticket ? props.ticket.first_name : "",
			last_name: props.ticket ? props.ticket.last_name : "",
			employee_id: props.ticket ? props.ticket.employee_id : "",
			email: props.ticket ? props.ticket.email : "",
			symptom: props.ticket ? props.ticket.symptom : undefined,
			department: props.ticket ? props.ticket.department : undefined,
			assigned_tech: props.ticket
				? props.ticket.assigned_tech
				: undefined,
			resolved: props.ticket ? props.ticket.resolved : false,
			notes: props.ticket ? props.ticket.notes : "",
		},
	})

	const [symptoms] = useAtom(symptomsAtom)
	const [techs] = useAtom(techsAtom)
	const [departments] = useAtom(departmentsAtom)

	const onSubmit = async (data: Inputs) => {
		props
			.onSubmit(data)
			.then(() => {
				alert("Item updated successfuly")
			})
			.catch((e) => alert(`Operation Failed. Please try again`))
	}

	const handleDelete = () => {
		props.onDelete &&
			props
				.onDelete()
				.then(() => {
					alert("Item deleted successfuly")
				})
				.catch((e) => alert("Failed to delete ticket. Please try again"))
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
			<FormControl isInvalid={errors.description && true}>
				<FormItemLabel htmlFor="description" text="Description" />
				<Input
					id="description"
					placeholder="Issue Description"
					{...register("description", {
						required: "This is required",
						minLength: {
							value: 30,
							message: "Minimum length should be 30 characters",
						},
					})}
				/>
				<FormErrorMessage>
					{errors.description && errors.description.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.first_name && true}>
				<FormItemLabel htmlFor="first_name" text="First Name" />
				<Input
					id="first_name"
					placeholder="First Name"
					{...register("first_name", {
						required: "This is required",
						minLength: {
							value: 2,
							message: "Minimum length should be 2",
						},
					})}
				/>
				<FormErrorMessage>
					{errors.first_name && errors.first_name.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.last_name && true}>
				<FormItemLabel htmlFor="last_name" text="Last Name" />
				<Input
					id="last_name"
					placeholder="Last Name"
					{...register("last_name", {
						required: "This is required",
						minLength: {
							value: 2,
							message: "Minimum length should be 2",
						},
					})}
				/>
				<FormErrorMessage>
					{errors.last_name && errors.last_name.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.employee_id && true}>
				<FormItemLabel htmlFor="employee_id" text="Employee ID" />
				<Input
					id="employee_id"
					placeholder="Employee ID"
					{...register("employee_id", {
						required: "This is required",
						pattern: {
							value: /^[0-9]{5}$/,
							message:
								"Please enter your employee ID (5 digit number)",
						},
					})}
				/>
				<FormErrorMessage>
					{errors.employee_id && errors.employee_id.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.email && true}>
				<FormItemLabel htmlFor="email" text="Email" />
				<Input
					type="text"
					id="email"
					placeholder="email@fakeitcompany.com"
					{...register("email", {
						required: "This is required",
						pattern: {
							value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
							message: "Please enter a valid company email",
						},
					})}
				/>
				<FormErrorMessage>
					{errors.email && errors.email.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.symptom && true}>
				<FormItemLabel htmlFor="symptom" text="Symptom" />
				<Controller
					control={control}
					name="symptom"
					key="symptom"
					defaultValue=""
					rules={{ required: "This is required." }}
					render={({ field: { onChange, value, ref } }) => (
						<Select
							onChange={onChange}
							ref={ref}
							value={value}
							placeholder="Choose a symptom"
						>
							{symptoms?.map((symptom) => (
								<option key={symptom.id} value={symptom.name}>
									{symptom.name}
								</option>
							))}
						</Select>
					)}
				/>

				<FormErrorMessage>
					{errors.symptom && errors.symptom.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.assigned_tech && true}>
				<FormItemLabel htmlFor="assigned_tech" text="Assigned Tech" />
				<Controller
					control={control}
					name="assigned_tech"
					key="assigned_tech"
					defaultValue=""
					rules={{ required: "This is required." }}
					render={({ field: { onChange, value, ref } }) => (
						<Select
							onChange={onChange}
							ref={ref}
							value={value}
							placeholder="Choose a tech"
						>
							{techs?.map((tech) => (
								<option key={tech.id} value={tech.full_name}>
									{tech.full_name}
								</option>
							))}
						</Select>
					)}
				/>

				<FormErrorMessage>
					{errors.assigned_tech && errors.assigned_tech.message}
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

			<FormControl isInvalid={errors.resolved && true}>
				<FormItemLabel htmlFor="resolved" text="Resolved ?" />
				<Controller
					control={control}
					name="resolved"
					key="resolved"
					defaultValue={false}
					render={({ field: { onChange, value, ref } }) => (
						<Checkbox
							onChange={onChange}
							ref={ref}
							isChecked={value}
						>
							Yes
						</Checkbox>
					)}
				/>

				<FormErrorMessage>
					{errors.resolved && errors.resolved.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.notes && true}>
				<FormItemLabel htmlFor="notes" text="Notes" />
				<Input
					id="notes"
					placeholder="Notes for IT department"
					{...register("notes")}
				/>
				<FormErrorMessage>
					{errors.notes && errors.notes.message}
				</FormErrorMessage>
			</FormControl>

			<Button colorScheme="teal" isLoading={isSubmitting} type="submit">
				{props.buttonName ? props.buttonName : "Add Ticket"}
			</Button>

			<Button
				display={props.ticket ? "block" : "none"}
				colorScheme="red"
				onClick={handleDelete}
			>
				Delete Ticket
			</Button>
		</Box>
	)
}
