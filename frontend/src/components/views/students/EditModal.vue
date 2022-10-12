<script setup lang="ts">
import { ref } from "vue"
import { Form } from "vee-validate"
import * as yup from "yup"

import api from "@/services/api"
import type { IStudent } from "@/services/api"
import { alert, toast } from "@/plugins/sweetalert"

import Input from "@/components/Input.vue"
import Modal from "@/components/Modal.vue"

const validationSchema = yup.object().shape({
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
})

const loading = ref(false)
const loadingStudent = ref(false)
const emit = defineEmits<{ (e: "success"): void }>()
const buttonSubmit = ref<HTMLButtonElement | null>(null)
const showModal = ref(false)
const studentToBeEdited = ref<IStudent | null>(null)

const loadStudent = async (studentId: string) => {
	try {
		loadingStudent.value = true
		const { student } = await api.findOneStudent(studentId)
		studentToBeEdited.value = student
	} catch (e) {
		close()
	} finally {
		loadingStudent.value = false
	}
}

const onSubmit: any = async ({
	name,
	email,
}: {
	name: string
	email: string
}) => {
	if (!studentToBeEdited.value) return

	try {
		loading.value = true
		await api.updateStudent(studentToBeEdited.value.id, { name, email })
		loading.value = false
		emit("success")
		close()
		await toast.success("Student successfully updated")
	} catch (e: any) {
		loading.value = false
		await alert.error(undefined, e.message)
	}
}

const close = () => {
	showModal.value = false
	studentToBeEdited.value = null
}

const open = (studentId: string) => {
	loadStudent(studentId)
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
		title="Edit student"
		confirm-button-text="Save changes"
		:loading="loading"
	>
		<Form
			v-if="studentToBeEdited"
			class="grid gap-y-2"
			:validation-schema="validationSchema"
			@submit="onSubmit"
		>
			<Input
				:value="studentToBeEdited.ra"
				type="number"
				name="ra"
				label="RA"
				disabled
				placeholder="Enter student RA"
			/>
			<Input
				:value="studentToBeEdited.cpf"
				type="text"
				name="cpf"
				label="CPF"
				placeholder="Enter student CPF"
				disabled
			/>
			<Input
				:value="studentToBeEdited.name"
				type="text"
				name="name"
				label="Name"
				placeholder="Enter student name"
			/>
			<Input
				:value="studentToBeEdited.email"
				type="email"
				name="email"
				label="Email"
				placeholder="Enter student email"
			/>
			<button ref="buttonSubmit" type="submit" class="hidden"></button>
		</Form>
	</Modal>
</template>
