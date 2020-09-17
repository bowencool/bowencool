/**
 * @author Bowen Zhao <z.bowen66@gmail.com>
 * Created at 2019-11-01 10:42:45
 */

export const selectFile = ({
  accept = 'image/*', // 常见的有'image/*'、'.xls,.xlsx'
  multiple = false,
}: { accept?: string; multiple?: boolean } = {}): Promise<FileList> =>
  new Promise((resolve) => {
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    if (multiple) input.multiple = multiple;
    input.onchange = (e: InputEvent) => {
      resolve((e.target as HTMLInputElement).files);
    };
    input.click();
  });

export const downloadFile = (blob: Blob, filename?: string): void => {
  const a = document.createElement('a');
  const blobUrl = window.URL.createObjectURL(blob);
  a.href = blobUrl;
  a.download = filename || blob['filename'];
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(blobUrl);
  a.remove();
};

/**
 * 计算字符串所占的内存字节数，默认使用UTF-8的编码方式计算，也可制定为UTF-16
 * UTF-8 是一种可变长度的 Unicode 编码格式，使用一至四个字节为每个字符编码
 *
 * 000000 - 00007F(128个代码)      0zzzzzzz(00-7F)                             一个字节
 * 000080 - 0007FF(1920个代码)     110yyyyy(C0-DF) 10zzzzzz(80-BF)             两个字节
 * 000800 - 00D7FF
 * 00E000 - 00FFFF(61440个代码)    1110xxxx(E0-EF) 10yyyyyy 10zzzzzz           三个字节
 * 010000 - 10FFFF(1048576个代码)  11110www(F0-F7) 10xxxxxx 10yyyyyy 10zzzzzz  四个字节
 *
 * 注: Unicode在范围 D800-DFFF 中不存在任何字符
 * {@link http://zh.wikipedia.org/wiki/UTF-8}
 *
 * UTF-16 大部分使用两个字节编码，编码超出 65535 的使用四个字节
 * 000000 - 00FFFF  两个字节
 * 010000 - 10FFFF  四个字节
 *
 * {@link http://zh.wikipedia.org/wiki/UTF-16}
 * @param  {String} str
 * @param  {String} charset utf-8, utf-16
 * @return {Number}
 */
export function sizeOfString(str: string, charset: string = 'utf-8') {
  var total = 0,
    charCode,
    i,
    len;
  charset = charset ? charset.toLowerCase() : '';
  if (charset === 'utf-16' || charset === 'utf16') {
    for (i = 0, len = str.length; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode <= 0xffff) {
        total += 2;
      } else {
        total += 4;
      }
    }
  } else {
    for (i = 0, len = str.length; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode <= 0x007f) {
        total += 1;
      } else if (charCode <= 0x07ff) {
        total += 2;
      } else if (charCode <= 0xffff) {
        total += 3;
      } else {
        total += 4;
      }
    }
  }
  return total;
}
export function sizeOfFormData(fd: FormData) {
  let total = 0;
  fd.forEach((v, k, parent) => {
    if (v instanceof File) {
      total += v.size;
    } else if (typeof v === 'string') {
      total += sizeOfString(v);
    }
  });
  return total;
}
// const KB = 2 ** 10;

export const compressString = (str: string, charset: string = 'utf-8') => {
  const len = str.length;
  if (len < 2 ** 9) return str;
  const head = str.substr(0, 200);
  const trail = str.substr(-200);
  return `${head}\n...[${len - 400} more]...\n${trail}`;
};
