type NoReturnFn = (this: any, ...args: any[]) => void;
/**
 * @author bowencool<z.bowen66@gmail.com>
 * @description sleep(promise版的定时器)
 * @param {number} ms 毫秒
 * @returns {promise}
 * @example ```js
 *  await sleep(1000);
 * ```
 */
export const sleep = (ms: number = 500): Promise<void> =>
  new Promise((_: NoReturnFn) => setTimeout(_, ms));

/**
 * @author bowencool<z.bowen66@gmail.com>
 * @description 去抖
 * @param {function} fn
 * @param {number} ms 毫秒
 * @returns {function} 去抖后的function
 */
export function debounce<F extends NoReturnFn>(
  fn: F,
  ms: number = 300,
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function debounced(this: ThisParameterType<F>, ...args): void {
    if (timeoutId !== void 0) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.call(this, ...args);
    }, ms);
  };
}
/**
 * @description 方法装饰器工厂：去抖
 * @param {number} ms 毫秒
 * @example ``` js
 *   @Debounce(300)
 *   public method() {}
 * ```
 */
export function Debounce(ms: number = 300) {
  return function (prototype: { [key: string]: any }, propertyKey: string) {
    const originFn: NoReturnFn = prototype[propertyKey];
    prototype[propertyKey] = debounce(originFn, ms);
  };
}

// /**
//  * @author bowencool<z.bowen66@gmail.com>
//  * @description 节流
//  * @param {function} fn
//  * @param {number} ms 毫秒
//  * @returns {function} 节流后的function
//  */
// export const throttle = (fn, ms = 300) => {
//   let lastInvoke = 0;
//   return function throttled(...args) {
//     const now = Date.now();
//     if (now - lastInvoke < ms) return;
//     lastInvoke = now;
//     fn.call(this, ...args);
//   };
// };

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

// /**
//  * @author bowencool<z.bowen66@gmail.com>
//  * @description 异步去抖：短时间内触发多次，取最后一次触发的结果。如果说debounce是发送前取最后一次输入，那么debounceAsync就是发送后取最后一次请求对应的输出。
//  * @example https://jsfiddle.net/bowencool/umoxrezg/
//  * @param {() => Promise<any>} fn
//  * @returns {() => Promise<any>} 去抖后的function
//  */
// export function debounceAsync(fn) {
//   let lastFetchId = 0;

//   return function (...args) {
//     const fetchId = ++lastFetchId;

//     return fn
//       .call(this, ...args)
//       .then((...a1) => {
//         if (fetchId !== lastFetchId) {
//           return new Promise(() => {});
//         } else {
//           return Promise.resolve(...a1);
//         }
//       })
//       .catch((...a2) => {
//         return Promise.reject(...a2);
//       });
//   };
// }
