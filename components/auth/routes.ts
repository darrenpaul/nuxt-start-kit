interface Route {
	path: string
	name: string
	label: string
}

export const signInRoute: Route = {
	path: '/auth/sign-in',
	name: 'signIn',
	label: 'Sign In',
}

export const signInSuccessRoute: Route = {
	path: '/dashboard',
	name: 'dashboard',
	label: 'Dashboard',
}
