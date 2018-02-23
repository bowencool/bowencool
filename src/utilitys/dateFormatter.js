const f = function (date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    if (typeof date !== 'object') {
        date = new Date(date)
    }
    if (/(y+)/.test(fmt)) {
        const _$1 = RegExp.$1
        const year = (date.getFullYear() + '').substr(4 - _$1.length, _$1.length)
        fmt = fmt.replace(_$1, year)
    }
    const o = {
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        'h': date.getHours(),
        'm': date.getMinutes(),
        's': date.getSeconds()
    }
    fmt = fmt.replace(/(M|d|h|m|s)+/g, (rez, key) => (o[key] + '').padStart(rez.length, '0'))
    return fmt
}

// module.exports = f
export default f
