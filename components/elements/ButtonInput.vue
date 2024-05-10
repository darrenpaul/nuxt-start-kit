<script setup>
const props = defineProps({
	onClick: { type: Function, required: true },
	loading: { type: Boolean, default: false },
	disabled: { type: Boolean, default: false },
	type: { type: String, default: 'button' },
})
</script>

<template>
	<button
		:type="props.type"
		class="btn btn-neutral"
		:disabled="props.disabled || props.loading"
		@click="props.onClick"
	>
		<template v-if="loading">
			<span class="loading loading-spinner" />
			Loading
		</template>

		<slot v-if="!loading" />
	</button>
</template>

<style lang="scss" scoped></style>
