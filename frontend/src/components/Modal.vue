<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid"

import { defineEmits, defineProps, withDefaults } from "vue"
import Button from "@/components/Button.vue"

interface IProps {
	title: string
	confirmButtonText?: string
	closeButtonText?: string
	showConfirmButton?: boolean
	showCloseButton?: boolean
	loading?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
	closeButtonText: "Close",
	confirmButtonText: "Ok",
	showCloseButton: true,
	showConfirmButton: true,
	loading: false,
})
const emit = defineEmits<{
	(e: "confirm"): void
	(e: "close"): void
}>()
</script>

<template>
	<div
		class="bg-slate-800/60 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
	>
		<div
			class="relative w-3/4 md:w-3/5 lg:w-2/5 my-6 mx-auto min-w-2xl max-w-2xl"
		>
			<div
				class="border-0 shadow-lg relative flex flex-col w-full outline-none focus:outline-none rounded-2xl bg-slate-50"
			>
				<!--header-->
				<div
					class="flex items-start justify-between p-5 border-b border-solid border-slate-200"
				>
					<h3 class="text-xl font-semibold">{{ props.title }}</h3>
					<button
						@click="emit('close')"
						class="p-1 ml-auto bg-transparent border-0 text-slate-900 float-right text-3xl leading-none outline-none focus:outline-none"
					>
						<XMarkIcon class="h-6 w-6" />
					</button>
				</div>
				<!--body-->
				<div class="relative p-6 flex-auto">
					<slot />
				</div>

				<!--footer-->
				<div
					class="flex items-center justify-end p-4 border-t border-solid border-slate-200"
				>
					<Button
						@click="emit('close')"
						variant="secondary"
						class="mr-3"
					>
						{{ props.closeButtonText }}
					</Button>
					<Button
						v-if="props.showConfirmButton"
						@click="emit('confirm')"
						:loading="props.loading"
					>
						{{ props.confirmButtonText }}
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>
