/**
 * v-clipboard 指令
 * 使用方法：v-clipboard="text"
 */
import Clipboard from 'clipboard';
import { Message } from 'ant-design-vue';

export default {
  bind(el, binding, vnode, oldVnode) {
    const clipboard = new Clipboard(el, {
      text: () => binding.value,
    });
    clipboard.on('success', (e) => {
      Message.success('复制成功');
    });
    // clipboard.on('error', (e) => {
    // });
  },
};
