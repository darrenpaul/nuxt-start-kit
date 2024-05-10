<script setup lang="ts">
import type Notification from '~/components/toast-notifications/models/notification'
import type NotificationQueueItem from '~/components/toast-notifications/models/notification-queue-item'
import Bread from '~/components/toast-notifications/components/Bread.vue'

const props = defineProps({
	notification: {
		type: Object as PropType<Notification>,
	},
	duration: {
		type: Number,
		default: 5,
	},
})

const notificationQueue = ref<NotificationQueueItem[]>([])

function generateUID(length: number): string {
	let uid = ''
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const charactersLength = characters.length

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charactersLength)
		uid += characters.charAt(randomIndex)
	}

	return uid
}

function removeNotificationFromQueue(id: string): void {
	notificationQueue.value = notificationQueue.value.filter(notification => notification.id !== id)
}

watch([props], () => {
	if (props.notification) {
		notificationQueue.value.push({
			id: generateUID(5),
			title: props.notification.title,
			message: props.notification.message,
			type: props.notification.type,
		})
	}
})
</script>

<template>
	<div class="notification">
		<TransitionGroup name="slide-fade">
			<Bread
				v-for="notificationQueueItem in notificationQueue"
				:key="notificationQueueItem.id"
				:notification-queue-item="notificationQueueItem"
				:on-timer-finish="removeNotificationFromQueue"
			/>
		</TransitionGroup>
	</div>
</template>

<style scoped lang="scss">
@import '~/components/toast-notifications/styles/notification.scss';
</style>
