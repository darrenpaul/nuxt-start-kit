<script setup lang="ts">
const SIGN_IN_TAB = 'SIGN_IN'
const SIGN_UP_TAB = 'SIGN_UP'

const tabs: { id: typeof SIGN_IN_TAB | typeof SIGN_UP_TAB, label: string }[] = [
	{ id: SIGN_IN_TAB, label: 'Sign In' },
	{ id: SIGN_UP_TAB, label: 'Sign Up' },
]

const activeTab = defineModel<typeof SIGN_IN_TAB | typeof SIGN_UP_TAB>()
</script>

<template>
	<div role="tablist" class="tabs tabs-boxed">
		<button
			v-for="tab in tabs"
			:key="tab.id" role="tab"
			class="tab" :class=" [activeTab === tab.id && 'tab-active']"
			@click="activeTab = tab.id"
		>
			{{ tab.label }}
		</button>
	</div>
</template>

<style scoped lang="scss">
@import '@/components/auth/styles/Auth.scss';
</style>
