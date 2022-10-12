<script setup lang="ts">
import { ref } from "vue"
import { Form } from "vee-validate"
import * as yup from "yup"

import Input from "@/components/Input.vue"
import Modal from "@/components/Modal.vue"
import api from "@/services/api"
import { alert, toast } from "@/plugins/sweetalert"

const validationSchema = yup.object().shape({
	ra: yup.string().min(3).max(6).required("RA field is required."),
	name: yup
		.string()
		.trim()
		.min(3)
		.max(255)
		.required("Name field is required."),
	email: yup
		.string()
		.trim()
		.min(3)
		.max(255)
		.email("The value entered is not a valid email.")
		.required("Email field is required"),
	cpf: yup.string().trim().length(14).required("CPF field is required."),
})

const loading = ref(false)
const emit = defineEmits<{ (e: "success"): void }>()
const buttonSubmit = ref<HTMLButtonElement | null>(null)
const showModal = ref(false)

const onSubmit = async (form: any) => {
	try {
		loading.value = true
		await api.createStudent({ ...form, cpf: form.cpf.replace(/\D/g, "") })
		loading.value = false
		emit("success")
		close()
		await toast.success("Student created successfully")
	} catch (e: any) {
		loading.value = false
		await alert.error(undefined, e.message)
	}
}
const close = () => {
	showModal.value = false
}

const open = () => {
	showModal.value = true
}

defineExpose({
	open,
	close,
})
</script>

<template>
	<Modal
		v-if="showModal"
		@close="close"
		@confirm="() => buttonSubmit?.click()"
		title="Add new student"
		confirm-button-text="Add"
		:loading="loading"
	>
		<Form
			class="grid gap-y-2"
			:validation-schema="validationSchema"
			@submit="onSubmit"
		>
			<Input
				name="ra"
				label="RA"
				placeholder="Enter student RA"
				maska="#*"
			/>
			<Input name="name" label="Name" placeholder="Enter student name" />
			<Input
				name="cpf"
				label="CPF"
				placeholder="Enter student CPF"
				maska="###.###.###-##"
			/>
			<Input
				type="email"
				name="email"
				label="Email"
				placeholder="Enter student email"
			/>
			<button ref="buttonSubmit" type="submit" class="hidden"></button>
		</Form>
	</Modal>
</template>
