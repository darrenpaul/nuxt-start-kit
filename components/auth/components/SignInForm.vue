<script setup lang="ts">
import { isEmailValid, isPasswordValid } from '~/components/auth/tools/input-validation'
import { dashboardRoute } from '~/router'

const emit = defineEmits(['error'])

const supabase = useSupabaseClient()
const router = useRouter()

const email = ref<string>()
const emailValid = ref<boolean>(true)
const password = ref<string>()
const passwordValid = ref<boolean>(true)
const loading = ref(false)

const canLogin = computed(() => {
	return (isEmailValid(email.value) && isPasswordValid(password.value))
})

async function handleLogin(event: Event) {
	event.preventDefault()

	if (!email.value || !password.value || !canLogin.value)
		return

	loading.value = true

	const { error } = await supabase.auth.signInWithPassword({
		email: email.value,
		password: password.value,
	})

	if (error) {
		loading.value = false
		emit('error', error.message)
		return
	}

	router.push(dashboardRoute)

	loading.value = false
}
</script>

<template>
	<div class="form-container">
		<header class="form-header">
			<h1>Welcome back</h1>
			<small>Please enter your details to sign in</small>
		</header>

		<slot />

		<form class="form">
			<TextInput
				v-model="email"
				label="Email"
				input-type="email"
				:has-error="!emailValid"
				:required="true"
				@input="() => emailValid = isEmailValid(email)"
			/>

			<TextInput
				v-model="password"
				label="Password"
				input-type="password"
				:has-error="!passwordValid"
				:required="true"
				@input="() => passwordValid = isPasswordValid(password)"
			/>

			<ButtonInput
				class="w-full"
				:on-click="handleLogin"
				:loading="loading"
				:disabled="!canLogin"
				type="submit"
			>
				Sign In
			</ButtonInput>
		</form>
	</div>
</template>

<style scoped lang="scss">
@import '@/components/auth/styles/Auth.scss';
</style>
