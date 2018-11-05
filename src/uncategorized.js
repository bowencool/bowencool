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
 * @author zbw
 * @param {obj} obj 目标对象
 * @param {string} path 路径，例如"a.b.c"
 * @return {any} 该路径下的值
 */
export const findValue = function(obj, path) {
	let o = obj;
	path.split(".").forEach(p => {
		o = o[p];
	});
	return o;
};

export const debounce = function(fn, wait = 300) {
	let timer;
	return function debounced(...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.call(this, ...args);
		}, wait);
	};
};
