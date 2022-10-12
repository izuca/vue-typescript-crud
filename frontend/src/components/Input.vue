<script lang="ts" setup>
import { defineProps, withDefaults } from "vue"
import type { InputHTMLAttributes } from "vue"
import { maska as vMaska } from "maska"
import { useField } from "vee-validate"

interface IProps extends InputHTMLAttributes {
	name: string
	type?: string
	label?: string
	maska?: string | string[]
	placeholder?: string
	disabled?: boolean
	value?: any
}

const props = withDefaults(defineProps<IProps>(), {
	type: "text",
	maska: undefined,
})

const {
	value: inputValue,
	errorMessage,
	handleBlur,
	handleChange,
	meta,
} = useField(props.name, undefined, {
	initialValue: props.value,
})
</script>

<template>
	<div>
		<label
			v-if="props.label"
			:for="props.name"
			class="font-bold block mb-1"
		>
			{{ props.label }}</label
		>
		<input
			v-bind="props"
			:id="props.name"
			v-maska="props.maska"
			class="input"
			:class="{ 'has-error': !!errorMessage }"
			:value="inputValue"
			@input="e => handleChange(e, false)"
			@blur="handleBlur"
		/>
		<span v-if="errorMessage && !meta.valid" class="text-red-600 ml-3">
			{{ errorMessage }}
		</span>
	</div>
</template>

<style lang="postcss" scoped>
.input {
	@apply outline-none text-left rounded-xl border border-solid border-slate-600 py-3 px-5
	transition-all duration-75 ease-linear hover:shadow-2xl w-full;
}
.input.has-error {
	@apply border-red-600;
}
.input:focus {
	@apply border-slate-900;
}
.input::placeholder {
	@apply text-slate-400;
}
.input:disabled {
	@apply opacity-80 pointer-events-none bg-gray-200;
}
</style>
