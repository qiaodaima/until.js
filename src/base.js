/**
 * 复制字符串到剪贴板
 *
 * example: copyToClipboard('需要被复制的文案')
 * return: true
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
    console.error(error);
    return false;
  }
}


/**
 * 设置DOM节点对象的属性
 *
 * example: setElementAttribute(document.querySelector('.box'), {
 *  style: {
 *    position: 'absolute',
 * },
 * textContent: '内容'
 * });
 * return: undefined
 *
 * @param {object} element DOM节点对象
 * @param {object} attrList 属性列表
 * @returns {undefined} 无返回值
 */
export const setElementAttribute = (element, attrList) => {
  Object.keys(attrList).map(key => {
    switch (typeof attrList[key]) {
      case 'object':
        setElementAttribute(element[key], attrList[key]);
        break;
      default:
        element[key] = attrList[key];
        break;
    }
  });
}


/**
 * 获取元素的大小、样式、相对可视窗口的位置、相对于文档流的位置
 *
 * example: getElementFeature(document.querySelector('.box'))
 * return: {
 *  width, height, left, top, right, bottom, // getBoundingClientRect()的结果
 *  style, // getComputedStyle()的结果
 *  offsetTop, 相对文档流顶部的距离
 *  offsetLeft, 相对文档流左边的距离
 * }
 *
 * @param {object} element DOM节点对象
 * @returns {object} 各个属性的集合
 */
export const getElementFeature = (element) => {
  const { scrollTop, clientTop, scrollLeft, clientLeft } = document.documentElement;
  const { left, top, right, bottom, width, height } = element.getBoundingClientRect();
  const style = getComputedStyle(element, null);

  return {
    width,
    height,
    style,
    left,
    top,
    right,
    bottom,
    offsetTop: top + scrollTop - clientTop,
    offsetLeft: left + scrollLeft - clientLeft,
  };
}


/**
 * 获取dom节点元素
 *
 * example: $('.box')
 * return: element
 *
 * example: $$('div')
 * return: elementList
 *
 * @param {*} selector 选择器
 * @returns {object} element DOM节点对象
 */
export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);
