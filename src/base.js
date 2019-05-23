/**
 * 复制字符串到剪贴板
 *
 * @param {string} text 需要被复制的字符串
 * @returns {bool} 是否复制成功
 */
export const copyToClipboard = (text) => {
  try {
    // 是否支持指定的编辑指令
    const supported = document.queryCommandSupported('copy');

    if (!supported) {
      return false;
    }

    const input = document.createElement('textarea');

    input.value = text;
    input.style.cssText = 'position: absolute; top: -10000px; left: -10000px;';
    document.body.appendChild(input);

    input.setAttribute('readonly', ''); // 避免ios弹出键盘
    input.select();
    input.setSelectionRange(0, input.value.length); // 选中文本
    document.execCommand('copy');
    document.body.removeChild(input);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
