<script setup lang="ts">
const props = defineProps({
	options: { type: Array, required: true },
	disabled: { type: Boolean, default: false },
})

const value = defineModel<string>()
</script>

<template>
	<div class="join w-full">
		<input
			v-for="option in props.options"
			:key="option"
			v-model="value"
			:value="option"
			class="join-item btn w-1/3"
			type="radio"
			name="options"
			:aria-label="option"
			:checked="option === value"
			:disabled="disabled"
		>
	</div>
</template>

<style lang="scss" scoped></style>
