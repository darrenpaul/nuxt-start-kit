<script setup lang="ts">
import { Toaster, useToaster } from '~/components/toast-notifications'

const { notification } = useToaster()
const userStore = useUserStore()
const templateStore = useTemplateStore()

onMounted(() => {
	userStore.fetch()
	templateStore.fetch()
})
</script>

<template>
	<div class="dashboard-layout">

		<!-- TODO: Add Navigation component -->

		<section class="page-content">
			<slot />
		</section>

		<Toaster :notification="notification" />
	</div>
</template>

<style scoped>
@import '~/layouts/styles.scss';
</style>
