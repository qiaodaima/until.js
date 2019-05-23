/**
 * 创建标签
 *
 * @param {string} tag 标签名称，不传递标签名则默认创建div标签
 * @returns {object} DOM节点对象
 */
export const createElement = tag => document.createElement(tag ? tag : 'div');


/**
 * 删除DOM节点对象
 *
 * @param {object} element 需要删除的DOM节点对象
 */
export const delSelfElement = element => element.parentNode.removeChild(element);


/**
 * 设置DOM节点对象的属性
 *
 * @param {object} element DOM节点对象
 * @param {object} attr 属性值
 */
export const setElementAttribute = (element, attr) => {
  Object.keys(attr).map(key => {
    switch (typeof attr[key]) {
      case 'object':
        setElementAttribute(element[key], attr[key]);
        break;
      default:
        element[key] = attr[key];
        break;
    }
  });
}


/**
 * 数组去重
 *
 * @param {array} array 需要去重的数组
 * @returns {array} 原数组不变，返回去重后的数组
 */
export const unique = (array) => Array.from(new Set(array));


/**
 * 获取鼠标坐标
 *
 * @param {object} event 原生事件对象
 * @returns {object} 坐标集合
 */
export const getMouseAxis = event => ({
  x: event.clientX,
  y: event.clientY
})
