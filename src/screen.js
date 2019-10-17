/**
 * 判断一个元素是否在可视区域内
 *
 * example: isInVisibleArea(document.querySelector('#box'))
 * return: false
 *
 * example: isInVisibleArea(document.querySelector('#box'), 200)
 * return: true
 *
 * @param {object} element 需要被检测的DOM元素
 * @param {number} offset 偏移量，表示距离屏幕周边多少范围内 也算在可视区域内
 * @returns {bool} true: 在可视区域内    fasle: 不在可视区域内
 */
export const isInVisibleArea = (element, offset = 0) => {
    const isVisable = getComputedStyle(element).display !== 'none';
    const {
        clientWidth,
        clientHeight,
    } = document.documentElement;
    const {
        left,
        top,
        right,
        bottom
    } = element.getBoundingClientRect();
    const x = (right > 0 - offset) && (left < clientWidth + offset);
    const y = (bottom > 0 - offset) && (top < clientHeight + offset);

    return isVisable && x && y;
}
