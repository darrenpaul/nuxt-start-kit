import type Notification from '~/components/toast-notifications/models/notification'

const notification = ref<Notification | undefined>(undefined)

export default function useToaster() {
	function createNotification({ type, title, message }: Notification) {
		notification.value = { type, title, message }
	}
	return { notification, createNotification }
}
