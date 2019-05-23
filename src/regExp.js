export const allSpaceReg = /\s+/g; // 所有空格
export const bothEndSpaceReg = /(^\s*)|(\s*$)/g; // 两端空格
export const cutTelephoneReg = /(^\d{3}|\d{4}\B)/g; // 手机号码进行切割 344形式
export const chineseReg = /[\u4E00-\u9FA5]/g; // 中文
