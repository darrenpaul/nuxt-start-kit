<script setup lang="ts">
import { INFO, SUCCESS, WARN } from '~/components/toast-notifications/constants/notification-types'
import type NotificationQueueItem from '~/components/toast-notifications/models/notification-queue-item'

const props = defineProps({
	notificationQueueItem: {
		type: Object as PropType<NotificationQueueItem>,
		required: true,
	},
	duration: { type: Number, default: 5 },
	onTimerEnd: { type: Function, default: () => { } },
	onTimerFinish: { type: Function, required: true },
})

const durationLeft = ref(props.duration)
const timer = ref<NodeJS.Timeout>()

function clearNotification(): void {
	props.onTimerEnd(false)
	props.onTimerFinish(props.notificationQueueItem.id)
}

function createTimer(): void {
	timer.value = setInterval(() => {
		durationLeft.value++
		if (durationLeft.value >= props.duration)
			props.onTimerFinish(props.notificationQueueItem.id)
	}, 1000)
}

const notificationStyle = computed(() => {
	switch (props.notificationQueueItem.type) {
		case WARN:
			return 'notification-warn'
		case INFO:
			return 'notification-info'
		case SUCCESS:
			return 'notification-success'
		default:
			return 'notification-error'
	}
})

onMounted(() => {
	durationLeft.value = 0
	createTimer()
})

onUnmounted(() => {
	if (timer.value)
		clearInterval(timer.value)
})
</script>

<template>
	<div class="notification-card" :class="[notificationStyle]" @click="clearNotification">
		<p class="notification-message">
			{{ props.notificationQueueItem.message }}
		</p>
	</div>
</template>

<style scoped lang="scss">
@import '~/components/toast-notifications/styles/notification.scss';
</style>
