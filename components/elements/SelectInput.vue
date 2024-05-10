<script setup lang="ts">
interface Option { label: string, value: string }

const props = defineProps({
	options: { type: Array as PropType<Option[]>, required: true },
	placeholder: { type: String, default: 'Select an Option' },
	hasError: { type: Boolean, default: false },
})

const value = defineModel<string>()
</script>

<template>
	<select
		v-model="value"
		class="select select-bordered w-full"
	>
		<option
			disabled
			selected
		>
			{{ props.placeholder }}
		</option>

		<option
			v-for="option in props.options"
			:key="option.value"
			:value="option.value"
		>
			{{ option.label }}
		</option>
	</select>
</template>

<style lang="scss" scoped></style>
