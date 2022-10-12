<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import { UserPlusIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/solid"

import { alert, toast } from "@/plugins/sweetalert"
import api from "@/services/api"
import type { IStudent } from "@/services/api"

import TableListTr from "@/components/views/students/TableListTr.vue"
import TableListThead from "@/components/views/students/TableListThead.vue"
import EditModal from "@/components/views/students/EditModal.vue"
import CreationModal from "@/components/views/students/CreationModal.vue"
import Button from "@/components/Button.vue"

const editModal = ref<InstanceType<typeof EditModal> | null>(null)
const creationModal = ref<InstanceType<typeof CreationModal> | null>(null)
const studentsList = reactive<{ count: number; students: IStudent[] }>({
	count: 0,
	students: [],
})
const search = ref<string | undefined>()

const loadStudents = async () => {
	const { students, count } = await api.listStudents({ q: search.value })
	studentsList.students = students
	studentsList.count = count
}

const handleDelete = async (id: string) => {
	const { isConfirmed } = await alert.question("Do you want to continue?")
	if (!isConfirmed) return

	await api.deleteStudent(id)
	studentsList.students = studentsList.students.filter(
		student => student.id !== id,
	)

	await toast.success("Student deleted successfully!")
}

const handleClickAddStudent = () => {
	creationModal.value?.open()
}

onMounted(() => {
	loadStudents()
})
</script>

<template>
	<div class="flex justify-between items-center mb-2">
		<div class="flex flex-1 items-center">
			<h3 class="text-2xl font-semibold mr-4">Students</h3>
			<div
				class="flex align-center rounded-3xl bg-white border border-solid border-slate-900 py-3 px-5 transition-all duration-75 ease-linear hover:shadow-2xl"
			>
				<input
					v-model="search"
					@keydown.enter="loadStudents"
					class="flex-1 outline-none border-none"
					placeholder="Search..."
				/>
				<MagnifyingGlassIcon class="h-5" />
			</div>
		</div>
		<Button @click="handleClickAddStudent" class="w-auto flex">
			<span class="flex items-center">
				<UserPlusIcon class="h-5 mr-3" /> Add new
			</span>
		</Button>
	</div>
	<div class="flex flex-col">
		<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
				<div class="overflow-hidden shadow">
					<table class="min-w-full">
						<TableListThead />
						<tbody>
							<TableListTr
								v-for="(student, key) in studentsList.students"
								:key="key"
								:student="student"
								@edit="() => editModal?.open(student.id)"
								@delete="handleDelete"
							/>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

	<CreationModal ref="creationModal" @success="loadStudents" />
	<EditModal ref="editModal" @success="loadStudents" />
</template>
1
