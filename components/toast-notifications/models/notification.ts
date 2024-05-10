import type { NotificationType } from '~/components/toast-notifications/constants/notification-types'

export default interface Notification {
	title: string
	message: string
	type: NotificationType
}
