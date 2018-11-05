/**
 * @author zbw
 * @param {sting} url - 地址
 * @param {number=} [w] - 宽度
 * @param {number=} [h] - 高度
 * @param {sting=} [title] - 标题
 * @return {object} 窗口的window对象
 */

export default function openWindow(url, w = 1500, h = 800, title) {
	// Fixes dual-screen position                            Most browsers       Firefox
	const dualScreenLeft =
		window.screenLeft !== undefined ? window.screenLeft : screen.left;
	const dualScreenTop =
		window.screenTop !== undefined ? window.screenTop : screen.top;

	const width = window.innerWidth
		? window.innerWidth
		: document.documentElement.clientWidth
			? document.documentElement.clientWidth
			: screen.width;
	const height = window.innerHeight
		? window.innerHeight
		: document.documentElement.clientHeight
			? document.documentElement.clientHeight
			: screen.height;
	/* eslint-disable no-mixed-operators */
	const left = width / 2 - w / 2 + dualScreenLeft;
	const top = height / 2 - h / 2 + dualScreenTop;
	/* eslint-enable no-mixed-operators */
	const newWindow = window.open(
		url,
		title,
		`toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
	);

	// Puts focus on the newWindow
	if (window.focus) {
		newWindow.focus();
	}
	return newWindow;
}
