import Vue from 'vue'
// import Toast from '@/utils/toast'

const setupWebViewJavascriptBridge = () => new Promise((resolve) => {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  if (isAndroid) {
    if (window.WebViewJavascriptBridge) {
      return resolve(window.WebViewJavascriptBridge);
    } else {
      window.document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function () {
          resolve(window.WebViewJavascriptBridge);
          console.log('WebViewJavascriptBridgeReady');
        },
        false
      );
    }
  } else {
    if (window.WebViewJavascriptBridge) { return resolve(window.WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(resolve); }
    window.WVJBCallbacks = [resolve];
    const WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    // WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => { document.documentElement.removeChild(WVJBIframe); }, 0);
  }
})

export const setupJSBridge_And_ReadyForVueAndWindow = async () => {
  const bridge = await setupWebViewJavascriptBridge()
  // 默认回复
  bridge.init && bridge.init((message, responseCallback) => {
    responseCallback && responseCallback('You called a function that doesn\'t exist.');
  });

  const $callNative = (NativeFunctionName, data) => new Promise((resolve, reject) => {
    console.log(`call Native: ${NativeFunctionName}`, data);
    bridge.callHandler('ALBridge_' + NativeFunctionName, JSON.stringify(data), function (resp) {
      console.log('Native response: ', resp);
      if (typeof resp === 'string') {
        resp = JSON.parse(resp)
      }
      const { status, data } = resp
      // eslint-disable-next-line
      if (status == '1') {
        resolve(data)
      } else {
        reject(resp)
        // Toast(`${NativeFunctionName} failed: ${JSON.stringify(resp)}`)
      }
    })
  })

  Vue.prototype.$bridge = window.$bridge = bridge
  Vue.prototype.$callNative = window.$callNative = $callNative
  Vue.prototype.$listenNative = window.$listenNative = bridge.registerHandler
  console.log('$bridge ready.');
}
