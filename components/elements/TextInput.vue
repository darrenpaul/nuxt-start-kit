<script setup lang="ts">
import htmlInputTypes from './tools/html-input-types'

const props = defineProps({
	label: { type: String, required: true },
	inputType: {
		type: String,
		required: true,
		validator: value => htmlInputTypes.includes(value),
	},
	placeholder: { type: String, default: '' },
	required: { type: Boolean, default: false },
	hasError: { type: Boolean, default: false },
})

const value = defineModel<string | number>()
</script>

<template>
	<label
		class="input input-bordered flex items-center gap-2" :class="[hasError && 'input-error']"
	>
		{{ props.label }}

		<input
			v-model.trim="value"
			:name="inputType"
			:type="inputType"
			class="grow"
			:placeholder="placeholder"
			:required="required"
		>
	</label>
</template>

<style lang="scss" scoped></style>
