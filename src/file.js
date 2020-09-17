/**
 * @description 选择文件
 * @param {object} [option] 自定义条件，可选
 * @param {string} [option.accept] 标准accept，可选，常见的有'image/*'、'.xls,.xlsx'
 * @param {boolean} [option.multiple] 是否多选，可选
 * @returns {Promise<FileList>}
 */
export const selectFile = ({ accept = 'image/*', multiple = false } = {}) =>
  new Promise(resolve => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    if (multiple) input.multiple = multiple;
    input.onchange = e => {
      resolve(e.target.files);
    };
    input.click();
  });

/**
 * @description 将文件保存到本地
 * @param {Blob} blob Blob对象
 * @param {string} [filename] 要保存的文件名
 */
export const downloadFile = (blob, filename = blob.filename) => {
  const a = document.createElement('a');
  const blobUrl = window.URL.createObjectURL(blob);
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(blobUrl);
  a.remove();
};

/**
 * @description 读取图片文件原始宽高
 * @param {Blob} file
 * @returns {Promise<{width:number,height:number}>}
 */
export const getImgRect = file =>
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
    reader.onerror = error => reject(error);
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
