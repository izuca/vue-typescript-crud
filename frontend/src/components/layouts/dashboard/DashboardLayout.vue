<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRouter, RouterView } from "vue-router"

import SideBar from "./SideBar.vue"
import TopBar from "./TopBar.vue"
import LoadingPage from "../LoadingPage.vue"

import { useUser } from "@/composables/user"
import api from "@/services/api"

const router = useRouter()
const { setUser } = useUser()
const loading = ref(true)

const loadMe = async () => {
	try {
		const { me } = await api.me()
		setUser(me)

		loading.value = false
	} catch {
		localStorage.removeItem("accessToken")
		await router.push("login")
	}
}

onMounted(() => {
	setTimeout(() => loadMe(), 500)
})
</script>

<template>
	<LoadingPage v-if="loading" />
	<main v-else class="flex h-full">
		<SideBar />
		<section class="bg-slate-900 w-full pr-6 py-6">
			<div
				class="flex h-full flex-col bg-slate-50 rounded-2xl py-5 px-7 overflow-x-hidden overflow-y-auto"
			>
				<TopBar />
				<div class="mt-11">
					<RouterView />
				</div>
			</div>
		</section>
	</main>
</template>
