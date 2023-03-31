import { type techDetailsType } from "@/types/techTypes"
import {
	Box,
	FormControl,
	FormErrorMessage,
	Button,
	Input,
} from "@chakra-ui/react"
import { Controller, useForm } from "react-hook-form"
import FormItemLabel from "./FormItemLabel"

type Inputs = {
	full_name: string
	email: string
}

export default function TechForm(props: {
	tech?: techDetailsType
	buttonName?: string
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

	const handleDelete = () => {
		console.log("tech deleted")
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

			<Button display={props.tech ? 'block' : 'none'} colorScheme='red' onClick={handleDelete}>Remove Tech</Button>
		</Box>
	)
}
