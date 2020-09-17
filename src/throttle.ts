
/**
 * @author bowencool<z.bowen66@gmail.com>
 * @description 节流
 * @param {function} fn
 * @param {number} ms 毫秒
 * @returns {function} 节流后的function
 */
export function throttle<T, P extends any[], R>(
  fn: (this: T, ...p: P) => R & (void extends R ? void : never),
  ms: number = 300,
) {
  let lastInvoke: number = 0;
  return function throttled(this: T, ...args: P) {
    const now: number = Date.now();
    if (now - lastInvoke < ms) return;
    lastInvoke = now;
    fn.call(this, ...args);
  };
}


// /**
//  * @author bowencool<z.bowen66@gmail.com>
//  * @description 异步节流：上一次的promise完成之前，不会再次触发。使用详情https://jsfiddle.net/bowencool/6d840n7z/
//  * @param {() => Promise<any>} fn
//  * @returns {() => Promise<any>} 节流后的function
//  */
// export function throttleAsync(fn) {
//   let isPending = false;
//   return function (...args) {
//     if (isPending) {
//       return new Promise(() => {});
//     } else {
//       isPending = true;
//       return fn
//         .call(this, ...args)
//         .then((...a1) => {
//           isPending = false;
//           return Promise.resolve(...a1);
//         })
//         .catch((...a2) => {
//           isPending = false;
//           return Promise.reject(...a2);
//         });
//     }
//   };
// }
