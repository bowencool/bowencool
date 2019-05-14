/**
 * @deprecated 全局的filter
 */

import moment from 'moment';
import NP from 'number-precision';

/**
 * @description 千分位：每三位加一个逗号
 * @param {string|number} value
 * @returns {string}
 */
export const toThousand = value =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/**
 * @description 显示为人民币，千分位、两位小数（自动舍入）、单位
 * @param {any} num 被Number解析的值，单位：分
 * @param {boolean} [flag=true] 是否显示前置单位‘￥’, 默认为true
 * @returns {string}
 */
export const currency = (num, flag = true) => {
  let n = Number(num);
  if (!Number.isFinite(n)) n = 0;
  const str = toThousand(NP.divide(n, 100).toFixed(2));
  return flag ? `￥${str}` : str;
};

/**
 * @description 时间格式化
 * @param {any} t moment解析的参数，支持10位和13位时间戳
 * @param {string} [fmt=YYYY-MM-DD HH:mm:ss] 格式
 */
export const time = (t, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  if (typeof t === 'number' && String(t).length < 13) t *= 1000;
  return moment(t).format(fmt);
};

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
    : '';
};
