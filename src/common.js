/**
 * @author zbw
 * @return {string} guid
 */
export function guid() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

/**
 * @description sleep(promise版的定时器)
 * @param {number} ms 毫秒
 * @returns {promise}
 * @example ```js
 *  await sleep(1000);
 * ```
 */
export const sleep = ms => new Promise(_ => setTimeout(_, ms));

/**
 * @description 去抖
 * @param {function} fn
 * @param {number} ms 毫秒
 * @returns {function} 去抖后的function
 */
export const debounce = (fn, ms = 300) => {
	let timer;
	return function debounced(...args) {
		clearInterval(timer);
		timer = setTimeout(() => {
			fn.call(this, ...args);
		}, ms);
	};
};

/**
 * @description 节流
 * @param {function} fn
 * @param {number} ms 毫秒
 * @returns {function} 节流后的function
 */
export const throttle = (fn, ms = 300) => {
	let lastInvoke = 0;
	return function throttled(...args) {
		const now = Date.now();
		if (now - lastInvoke < ms) return;
		lastInvoke = now;
		fn.call(this, ...args);
	};
};
