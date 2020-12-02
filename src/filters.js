/**
 * @author Bowen Zhao <z.bowen66@gmail.com>
 * Created at 2019-11-01 10:37:27
 */

import moment from 'moment'
import NP from 'number-precision'

/**
 * @description 千分位：每三位加一个逗号
 * @param {string|number} value
 * @returns {string}
 */
export const toThousand = (value = '-') => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

/**
 * @description 显示为人民币，千分位、两位小数（自动舍入）、单位
 * @param {any} num 被parseInt解析的值，单位：分
 * @param {boolean} [flag=true] 是否显示前置单位‘￥’, 默认为true
 * @returns {string}
 */
export const currencyCore = (num, { decimal, flag = true } = {}) => {
  let n = parseInt(num, 10)
  if (!Number.isFinite(n)) n = 0
  n = NP.divide(n, 100)
  if (typeof decimal === 'number') n = n.toFixed(2)
  const str = toThousand(n)
  return flag ? `￥${str}` : str
}

/**
 * @description 时间格式化
 * @param {any} t moment解析的参数，支持10位和13位时间戳
 * @param {string} [fmt=YYYY-MM-DD HH:mm:ss] 格式
 */
export const timeCore = (t, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  if (!t) return '-'
  // 处理字符串形式的时间戳
  if (typeof t === 'string' && /^\d{10,13}$/.test(t)) t = +t
  // 处理unix(10位)时间戳
  // if (typeof t === 'number' && t < 10 ** 12) t *= 1000
  return moment(t).format(fmt)
}

/**
 * 隐私保护
 * @param {string, start, end} 字符串，头部留几位，尾部留几位
 * @return {string} 加密后的字符串
 */
export const privacy = (str, start = 3, end = 4) => {
  return str
    ? `${str.substr(0, start || 3)}****${
        str.length > (start || 3) + 4 ? str.substr(str.length - (end || 4)) : ''
      }`
    : ''
}

/**
 * @description 仅接收一个参数的版本，可直接用于table.column.render
 */
export const date = t => timeCore(t, 'YYYY-MM-DD')
export const time = t => timeCore(t)
export const currency = n => currencyCore(n)
