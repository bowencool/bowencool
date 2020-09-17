/**
 * @author bowencool<z.bowen66@gmail.com>
 * @description 去抖
 */
export function debounce<T, P extends any[], R>(
  fn: (this: T, ...p: P) => R & (void extends R ? void : never),
  ms: number = 300,
) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function debounced(this: T, ...args: P) {
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
  return function (
    prototype: {
      [key: string]: any /* TODO, [propertyKey:string]: Function */;
    },
    propertyKey: string,
  ) {
    const originFn = prototype[propertyKey];
    prototype[propertyKey] = debounce(originFn, ms);
  };
}
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
