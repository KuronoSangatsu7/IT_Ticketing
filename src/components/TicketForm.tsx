import { type ticketDetailsType } from "@/types/ticketTypes"
import {
	Box,
	FormControl,
	FormErrorMessage,
	Button,
	Input,
	Checkbox,
} from "@chakra-ui/react"
import { Controller, useForm } from "react-hook-form"
import FormItemLabel from "./FormItemLabel"

type Inputs = {
	description: string
	first_name: string
	last_name: string
	employee_id: string
	email: string
	resolved: boolean
	notes: string
}

export default function TicketForm(props: {ticket?: ticketDetailsType, buttonName?: string}) {
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
			resolved: props.ticket ? props.ticket.resolved : false,
			notes: props.ticket ? props.ticket.notes : "",
		},
	})

	const onSubmit = async (data: Inputs) => {
		const myPromise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(console.log(data))
			}, 3000)
		})
		return myPromise
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
		</Box>
	)
}
