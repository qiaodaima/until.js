/**
 * 函数防抖
 *
 * @param {function} fn 需要被防抖的函数
 * @param {number} fps 防抖的频率，单位毫秒，默认200毫秒
 * @returns {function} 被防抖后的函数
 */
export const debounce = (fn, fps = 200) => {
    let timer = null;

    return function (...params) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.call(this, ...params);
        }, fps);
    }
}


/**
 * 函数节流
 *
 * @param {function} fn 需要被节流的函数
 * @param {number} fps 节流的频率，单位毫秒，默认500毫秒
 * @returns {function} 被节流后的函数
 */
export const throttle = (fn, fps = 500) => {
    let timer = null;
    let timeStampFlag = Date.parse(new Date());
    let isFirst = true;

    return function (...params) {
        const nowTimeStamp = Date.parse(new Date());
        const overflow = nowTimeStamp - timeStampFlag > fps;

        // 第一次不延时执行
        if (isFirst) {
            isFirst = false;
            fn.call(this, ...params);

            return;
        }

        if (overflow) {
            timeStampFlag = Date.parse(new Date());
            fn.call(this, ...params);
        } else {
            clearTimeout(timer);

            timer = setTimeout(() => {
                fn.call(this, ...params);
            }, fps);
        }
    }
}
