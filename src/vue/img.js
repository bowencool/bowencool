/**
 * v-img 指令
 * 使用方法：v-img="url"
 * 指令说明：在图片未完成加载前，用随机的背景色占位，图片加载完成后才直接渲染出来。
 */

export default {
  bind(el, binding, vnode, oldVnode) {
    const ranCol = Math.floor(Math.random() * 1000000);
    el.style.backgroundColor = `#${ranCol}`;

    const img = new Image();
    img.src = binding.value;
    img.onload = () => {
      el.style.backgroundImage = `url(${binding.value})`;
      el.style.backgroundSize = '100% 100%';
    };
  },
};
