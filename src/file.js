/**
 * @description 选择文件
 * @param {object} [option] 自定义条件，可选
 * @param {string} [option.accept] 标准accept，可选，常见的有'image/*'、'.xls,.xlsx,.csv,.numbers'
 * @param {boolean} [option.multiple] 是否多选，可选
 * @returns {Promise<FileList>}
 */
export const selectFile = ({ accept = 'image/*', multiple = false } = {}) =>
  new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    if (multiple) input.multiple = multiple;
    input.style.position = 'fixed';
    input.style.left = '-100%';
    input.onchange = (e) => {
      const { files } = e.target;
      input.remove();
      resolve(files);
    };
    document.body.appendChild(input);
    input.click();
  });

export function getBlobByUrl(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.responseType = 'blob';

    xhr.onload = () => {
      const blob = new Blob([xhr.response], { type: 'application/octet-stream' });
      resolve(blob);
    };
    xhr.onerror = reject;
    xhr.send();
  });
}
let t = 0; // 防死循环
export async function downloadByUrl(url, filename) {
  t++;
  const a = document.createElement('a');
  if (t > 10) return;
  // 跨域不能重命名
  if (filename && url.indexOf(window.location.origin) === -1) {
    console.log('跨域下载 && 重命名');
    try {
      downloadBlob(await getBlobByUrl(url), filename);
      return;
    } catch (error) {
      console.error(error);
      console.log('降级为浏览器原生下载（不能重命名）');
    }
  }
  a.href = url;
  if (filename) a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  t = 0;
}
/**
 * @description 将文件保存到本地
 * @param {Blob} blob Blob对象
 * @param {string} [filename] 要保存的文件名
 */
export async function downloadBlob(blob, filename = blob.name) {
  const blobUrl = window.URL.createObjectURL(blob);
  await downloadByUrl(blobUrl, filename);
  window.URL.revokeObjectURL(blobUrl);
}

/**
 * @description 读取图片文件原始宽高
 * @param {Blob} file
 * @returns {Promise<{width:number,height:number}>}
 */
export const getImgRect = (file) =>
  new Promise((resolve, reject) => {
    const imgDom = document.createElement('img');
    const src = window.URL.createObjectURL(file);
    imgDom.src = src;
    imgDom.onload = () => {
      const width = imgDom.naturalWidth;
      const height = imgDom.naturalHeight;
      // console.log(imgDom, width, height)
      window.URL.revokeObjectURL(src);
      resolve({
        width,
        height,
      });
    };
    imgDom.onerror = reject;
  });

export function blobToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}
/**
 * base64 转 blob 对象
 * @param {String} dataURL
 */
export function dataURLToBlob(dataURL) {
  const BASE64_MARKER = ';base64,';
  let parts;
  let contentType;
  let raw;
  if (dataURL.indexOf(BASE64_MARKER) === -1) {
    parts = dataURL.split(',');
    contentType = parts[0].split(':')[1];
    raw = decodeURIComponent(parts[1]);
    return new Blob([raw], { type: contentType });
  }
  parts = dataURL.split(BASE64_MARKER);
  contentType = parts[0].split(':')[1];
  raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}
