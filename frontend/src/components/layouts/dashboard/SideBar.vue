<script setup lang="ts">
import { UserIcon, UsersIcon } from "@heroicons/vue/24/solid"
import { useUser } from "@/composables/user"

const { user } = useUser()
</script>

<template>
	<section class="flex flex-col bg-slate-900 text-white pl-4 py-6">
		<div class="w-64">
			<header class="py-6 mr-10 flex items-center">
				<div
					class="border-2 rounded-full h-10 w-10 flex justify-center items-center"
				>
					<UserIcon class="h-8" />
				</div>
				<div class="ml-3 overflow-hidden">
					<h2 class="font-bold text-lg">{{ user?.name }}</h2>
					<span class="text-sm text-slate-400">
						{{ user?.email }}
					</span>
				</div>
			</header>

			<span class="font-bold text-slate-400 text-sm mb-5 ml-2 block">
				MAIN MENU
			</span>
			<ul class="nav">
				<li class="my-2">
					<RouterLink to="students">
						<UsersIcon class="h-8" />
						<span>Students</span>
					</RouterLink>
					<!-- <span class="tooltip">
						{{ menuItem.tooltip || menuItem.name }}
					</span> -->
				</li>
			</ul>
		</div>
	</section>
</template>

<style lang="postcss" scoped>
ul.nav li a {
	@apply flex items-center transition font-bold rounded-l-2xl p-2;
}
ul.nav li a.router-link-active,
ul.nav li a:hover {
	@apply bg-slate-50	text-slate-900;
}

ul.nav li a span {
	@apply ml-3;
}
</style>
