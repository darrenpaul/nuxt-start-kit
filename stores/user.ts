import { defineStore } from 'pinia'
import type { DomainUser } from '~/models/user'

const API_ROUTE = '/api/v1/user'

export const useUserStore = defineStore({
	id: 'user',

	state: () => ({
		user: {} as DomainUser,
	}),

	getters: {
		list: state => state.user,
	},

	actions: {
		fetch() {
			fetch(API_ROUTE, {
				method: 'GET',
			}).then(async (response) => {
				const jsonData = await response.json()
				if (jsonData.user)
					this.user = jsonData.user
			})
		},
		async edit(payload: {
			id: string
			name: string
			currencyId: string
		}) {
			const response = await fetch(API_ROUTE, {
				method: 'PUT',
				body: JSON.stringify(payload),
			})

			const jsonData = await response.json()
			if (jsonData.user)
				this.user = jsonData.user
		},
	},
})
