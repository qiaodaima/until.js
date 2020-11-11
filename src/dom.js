/**
 * 获取dom节点元素
 *
 * example: $('.box')
 * return: element
 *
 * example: $$('div')
 * return: elementList
 *
 * @param {DOMString} selector 要匹配的选择器的 DOM字符串
 * @returns {Element | NodeList} DOM节点对象
 */
export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);


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
 * 获取指定元素的所有父元素
 *
 * example: getParents('.menu');
 * return: [div.menu, div.menu] dom节点集合
 *
 * example: getParents('.menu', 'p');
 * return: [p, p] dom节点集合
 *
 * @param {DOMString} parentSelectors 目标元素选择器
 * @param {DOMString} filterSelectors 需要过滤的选择器
 * @returns {array} dom节点集合
 */
export const getParents = (parentSelectors, filterSelectors) => {
    // 获取一个元素的所有父节点
    const _getParentsList = (element) => {
        const result = [];
        let prevParentNode = element.parentNode;

        while (prevParentNode) {
            result.push(prevParentNode);
            prevParentNode = prevParentNode.parentNode;
        }

        return result;
    }
    const allNodeList = Array.from(document.querySelectorAll(parentSelectors));  // 所有的目标元素
    const allParenNodeListTemp = allNodeList.map(node => _getParentsList(node)); // 所有目标元素的父节点
    const allParenNodeList = Array.from(new Set(allParenNodeListTemp.flat(Infinity))); // 把数组进行拍平 和 去重
    const allFilterNodeList = Array.from(document.querySelectorAll(filterSelectors)); // 所有的过滤 节点

    return filterSelectors ? allFilterNodeList.filter(node => allParenNodeList.includes(node)) : allParenNodeList;
}
