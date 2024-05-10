<script setup lang="ts">
import SignInForm from '~/components/auth/components/SignInForm.vue'
import SignUpForm from '~/components/auth/components/SignUpForm.vue'
import Background from '~/components/auth/components/Background.vue'
import TabButtons from '~/components/auth/components/TabButtons.vue'
import { SIGN_IN_TAB, SIGN_UP_TAB } from '~/components/auth/constants/tabs'
import { ERROR, useToaster } from '~/components/toast-notifications'

const { createNotification } = useToaster()

const activeTab = ref<typeof SIGN_IN_TAB | typeof SIGN_UP_TAB>(SIGN_IN_TAB)

function createNotificationError(title: string, message: string) {
	createNotification({ title, message, type: ERROR })
}
</script>

<template>
	<div class="auth-page">
		<div class="row">
			<Background />

			<div class="card w-96 bg-base-100 shadow-xl self-center">
				<SignInForm v-if="activeTab === SIGN_IN_TAB" @error="(errorMessage:string) => createNotificationError(errorMessage, errorMessage)">
					<TabButtons v-model="activeTab" />
				</SignInForm>

				<SignUpForm v-if="activeTab === SIGN_UP_TAB" @error="(errorMessage:string) => createNotificationError(errorMessage, errorMessage)">
					<TabButtons v-model="activeTab" />
				</SignUpForm>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@import '@/components/auth/styles/Auth.scss';
</style>
