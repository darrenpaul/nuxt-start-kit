import type { NotificationType } from '~/components/toast-notifications/constants/notification-types'

export default interface NotificationQueueItem {
	id: string
	title: string
	message: string
	type: NotificationType
}
