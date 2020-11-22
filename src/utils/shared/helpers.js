import 'antd/dist/antd.css';

const convertArabicNumbersToEnglish = string =>
  // eslint-disable-next-line no-bitwise
  string.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, c => c.charCodeAt(0) & 0xf);

export { convertArabicNumbersToEnglish };
