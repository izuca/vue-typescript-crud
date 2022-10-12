<script setup lang="ts">
import * as yup from "yup"
import { Form } from "vee-validate"

import LoginBackground from "@/assets/images/login_background.jpg"
import Input from "@/components/Input.vue"
import Button from "@/components/Button.vue"

import { toast } from "@/plugins/sweetalert"
import { ref } from "vue"
import api from "@/services/api"
import { useUser } from "@/composables/user"

const loading = ref(false)
const { login } = useUser()

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.trim()
		.email("O E-mail é inválido.")
		.required("O campo EMAIL é obrigatório."),
	password: yup.string().trim().required("O campo PASSWORD é obrigatório."),
})

const onSubmit: any = async (form: never) => {
	try {
		loading.value = true
		const { accessToken } = await api.login(form)
		await login(accessToken)
	} catch (error: any) {
		loading.value = false
		await toast.error(error.message)
	}
}
</script>

<template>
	<div class="flex max-h-full h-full">
		<section class="flex-1 bg-slate-800">
			<div
				:style="{ backgroundImage: `url(${LoginBackground})` }"
				class="w-full h-full bg-cover"
			></div>
		</section>
		<section class="w-2/5 bg-slate-50">
			<div class="h-full px-20 py-10 flex flex-col justify-center">
				<Form
					class="grid gap-y-3"
					:validation-schema="validationSchema"
					@submit="onSubmit"
				>
					<Input
						type="email"
						name="email"
						label="EMAIL"
						placeholder="Enter your email"
					/>
					<Input
						type="password"
						name="password"
						label="PASSWORD"
						placeholder="Enter your password"
					/>
					<Button :loading="loading" class="mt-2" type="submit">
						Log in
					</Button>
				</Form>
			</div>
		</section>
	</div>
</template>
