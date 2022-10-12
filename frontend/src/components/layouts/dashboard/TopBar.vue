<script setup lang="ts">
import { ArrowRightOnRectangleIcon } from "@heroicons/vue/24/solid"
import { useUser } from "@/composables/user"

const { user, logout } = useUser()

const handleClickLogout = () => logout()
</script>

<template>
	<header class="flex justify-between items-center">
		<h1 class="text-2xl font-light">Hello, {{ user?.name }}!</h1>

		<button @click="handleClickLogout" title="Log out">
			<ArrowRightOnRectangleIcon class="h-8" />
		</button>
	</header>
</template>
