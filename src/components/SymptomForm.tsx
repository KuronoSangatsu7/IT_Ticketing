import { type symptomDetailsType } from "@/types/symptomTypes"
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
	name: string
}

export default function SymptomForm(props: {
	symptom?: symptomDetailsType
	buttonName?: string
}) {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>({
		defaultValues: {
			name: props.symptom ? props.symptom.name : "",
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

			<Button colorScheme="teal" isLoading={isSubmitting} type="submit">
				{props.buttonName ? props.buttonName : "Add Symptom"}
			</Button>
		</Box>
	)
}
