// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		'@pinia/nuxt',
		'@nuxt/eslint',
		'@nuxtjs/supabase',
		'@nuxtjs/tailwindcss',
	],
	components: {
		global: true,
		dirs: ['~/components/elements', '~/components/icons'],
	},
	css: ['@/assets/styles/main.scss'],
	supabase: {
		url: process.env.PUBLIC_SB_URL,
		key: process.env.PUBLIC_SB_ANON_KEY,
		redirectOptions: {
			login: '/auth/sign-in',
			callback: '/confirm',
			include: undefined,
			exclude: ['/'],
			cookieRedirect: false,
		},
		cookieOptions: {
			maxAge: 60 * 60 * 8,
			sameSite: 'lax',
			secure: true,
		},
		clientOptions: {
			auth: {
				flowType: 'pkce',
				detectSessionInUrl: true,
				persistSession: true,
				autoRefreshToken: true,
			},
		},
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
})
