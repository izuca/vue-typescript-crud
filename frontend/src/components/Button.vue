<script lang="ts" setup>
import { defineEmits, defineProps, withDefaults } from "vue"
import type { ButtonHTMLAttributes } from "vue"
import Spinner from "@/components/Spinner.vue"

interface IProps extends ButtonHTMLAttributes {
	loading?: boolean
	type?: "submit" | "reset" | "button" | undefined
	variant?: "primary" | "secondary"
}

const props = withDefaults(defineProps<IProps>(), {
	loading: false,
	variant: "primary",
})

const emit = defineEmits(["click"])
</script>

<template>
	<button
		v-bind="props"
		v-if="props.type === 'submit'"
		class="button"
		:class="{
			'primary-variant': variant === 'primary',
			'secondary-variant': variant === 'secondary',
		}"
		:disabled="props.disabled || props.loading"
	>
		<Spinner v-if="props.loading" class="w-6 h-6 mr-4" />
		<span> <slot></slot> </span>
	</button>
	<button
		v-else
		v-bind="props"
		class="button"
		:class="{
			'primary-variant': variant === 'primary',
			'secondary-variant': variant === 'secondary',
		}"
		:disabled="props.disabled || props.loading"
		@click.prevent="() => emit('click')"
	>
		<Spinner v-if="props.loading" class="w-6 h-6 mr-4" />
		<span>
			<slot></slot>
		</span>
	</button>
</template>

<style lang="postcss" scoped>
.button {
	@apply outline-none focus:outline-none py-3 px-5 rounded-xl border-2 border-solid flex items-center justify-center
	transition-all duration-150 ease-linear hover:shadow-2xl font-bold;
}
.button.primary-variant {
	@apply text-white border-slate-900 hover:bg-slate-800 active:bg-slate-900 bg-slate-900;
}
.button.secondary-variant {
	@apply text-slate-900 bg-transparent border-slate-700 hover:bg-slate-700 hover:text-white active:bg-slate-800;
}
.button:active {
	@apply tracking-wider;
}
.button:disabled {
	@apply opacity-80 pointer-events-none;
}
</style>
