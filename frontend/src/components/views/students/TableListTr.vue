<script setup lang="ts">
import { defineProps, defineEmits } from "vue"
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/solid"

import type { IStudent } from "@/services/api"

const props = defineProps<{ student: IStudent }>()
const emit = defineEmits<{
	(e: "edit", id: string): void
	(e: "delete", id: string): void
}>()
</script>

<template>
	<tr
		class="bg-white border-b transition duration-300 ease-in-out hover:bg-slate-100"
	>
		<td class="td font-bold text-sm">
			{{ props.student.ra }}
		</td>
		<td class="td">
			{{ props.student.name }}
		</td>
		<td class="td">
			{{ props.student.cpf }}
		</td>
		<td class="td">
			{{ props.student.email }}
		</td>
		<td class="td text-end">
			<button
				@click="() => emit('edit', props.student.id)"
				class="mr-2 text-slate-700"
			>
				<PencilSquareIcon class="h-5" />
			</button>
			<button
				class="text-slate-700"
				@click="() => emit('delete', props.student.id)"
			>
				<TrashIcon class="h-5 text-slate-700" />
			</button>
		</td>
	</tr>
</template>

<style lang="postcss" scoped>
.td {
	@apply text-gray-900 px-6 py-4 whitespace-nowrap;
}
</style>
