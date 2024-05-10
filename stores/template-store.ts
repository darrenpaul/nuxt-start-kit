import { defineStore } from 'pinia'
import type { DomainTemplate } from '~/models/template'


export const useBudgetStore = defineStore({
	id: 'template-store',

	state: () => ({
		items: [] as DomainTemplate[],
	}),

	getters: {
		list: state => state.items,
	},
	actions: {
		fetch() {
			// Fetch api data
		},
		async add() {
			// Add new entry to the database
		},
		async edit() {
			// Edit existing entry in the database
		},
		async delete() {
			// Delete entry in the database
		},
	},
})
