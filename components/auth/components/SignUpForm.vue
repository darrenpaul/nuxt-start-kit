<script setup lang="ts">
import { isEmailValid, isNameValid, isPasswordValid } from '~/components/auth/tools/input-validation'
import { signInSuccessRoute } from '~/components/auth/routes'

const emit = defineEmits(['error'])

const supabase = useSupabaseClient()
const router = useRouter()

const name = ref<string>()
const nameValid = ref<boolean>(true)

const email = ref<string>()
const emailValid = ref<boolean>(true)

const password = ref<string>()
const passwordValid = ref<boolean>(true)

const loading = ref(false)

const canLogin = computed(() => {
	return (isNameValid(name.value) && isEmailValid(email.value) && isPasswordValid(password.value))
})

async function handleSignUp(event: Event) {
	event.preventDefault()

	if (!name.value || !email.value || !password.value || !canLogin.value)
		return

	loading.value = true

	await fetch('/api/v1/auth/sign-up', {
		method: 'POST',
		body: JSON.stringify({
			name: name.value,
			email: email.value,
			password: password.value,
		}),
	})

	const { error } = await supabase.auth.signInWithPassword({
		email: email.value,
		password: password.value,
	})

	if (error) {
		loading.value = false
		emit('error', error.message)
		return
	}

	router.push(signInSuccessRoute)

	loading.value = false
}
</script>

<template>
	<div class="form-container">
		<header class="form-header">
			<h1>Welcome</h1>
			<small>Please enter your details to sign up</small>
		</header>

		<slot />

		<form class="form">
			<TextInput
				v-model="name"
				label="Name"
				input-type="text"
				:has-error="!nameValid"
				:required="true"
				@input="() => nameValid = isNameValid(name)"
			/>

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
				:on-click="handleSignUp"
				:loading="loading"
				:disabled="!canLogin"
				type="submit"
			>
				Sign Up
			</ButtonInput>
		</form>
	</div>
</template>

<style scoped lang="scss">
@import '@/components/auth/styles/Auth.scss';
</style>
