/**
 * @description 全局svg图标组件
 * @author zhaobowen
 * @param {string} type 图标名，对应文件`@/assets/icons/${type}.svg`, 无需手动引入
 * @example ``` vue
 * <g-icon type="star-o"></g-icon>
 * ```
 */

import $options from './comp';

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('../../assets/icons', false, /\.svg$/);
requireAll(req);

export default {
  install(V) {
    V.component('g-icon', $options);
  },
};

// {
//   test: /\.svg$/,
//   loader: 'svg-sprite-loader',
//   include: [resolve('src/assets/icons')],
//   options: {
//     symbolId: 'icon-[name]',
//   },
// },
// {
//   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
//   loader: 'url-loader',
//   exclude: [resolve('src/assets/icons')],
//   options: {
//     limit: 10000,
//     name: assetsPath('img/[name].[hash:7].[ext]'),
//   },
// },
