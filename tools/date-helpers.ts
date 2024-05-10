import { endOfMonth, format, startOfMonth } from 'date-fns'

const DATE_FORMAT = 'MMM eo, yyyy'

export function dateTimeToString(date: Date = new Date()) {
	return format(date, 'yyyy-MM-dd HH:mm:ss')
}

export function startOfCurrentMonth() {
	return startOfMonth(new Date())
}

export function endOfCurrentMonth() {
	return endOfMonth(new Date())
}

export function formatDate(date: Date) {
	return format(date, DATE_FORMAT)
}
