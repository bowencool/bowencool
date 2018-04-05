// 格式化时间
export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
	if (!date) return ''
	if (typeof date !== 'object') {
		date = new Date(date)
	}
	if (/(y+)/.test(fmt)) {
		const _$1 = RegExp.$1
		const year = (date.getFullYear() + '').substr(4 - _$1.length, _$1.length)
		fmt = fmt.replace(_$1, year)
	}
	const o = {
		'M': date.getMonth() + 1,
		'd': date.getDate(),
		'h': date.getHours(),
		'm': date.getMinutes(),
		's': date.getSeconds(),
	}
	fmt = fmt.replace(/(M|d|h|m|s)+/g, (rez, key) => (o[key] + '').padStart(rez.length, '0'))
	return fmt
}

export function timeAgo(date) {
	if (!date) return ''
	const d = typeof date === 'object' ? date : new Date(date)
	const now = Date.now()

	const diff = (now - d) / 1000

	if (diff < 30) {
		return '刚刚'
	} else if (diff < 3600) { // less 1 hour
		return Math.ceil(diff / 60) + '分钟前'
	} else if (diff < (3600 * 24)) {
		return Math.ceil(diff / 3600) + '小时前'
	} else if (diff < (3600 * 24 * 30)) {
		return Math.ceil(diff / (3600 * 24)) + '天前'
	} else if (diff < (3600 * 24 * 365)) {
		return Math.ceil(diff / (3600 * 24 * 30)) + '个月前'
	} else {
		return formatDate(date)
	}
}

