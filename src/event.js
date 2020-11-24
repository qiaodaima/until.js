/**
 * 让函数只运行一次
 *
 * @param {Function} fn 需要被处理的函数
 */
const _once = (fn) => {
    let used = false;

    return (...params) => {
        if (used) {
            return;
        }

        used = true;
        fn.call(this, ...params);
    }
}

// FIXME: 属性的方法都是用箭头函数来实现，需要注意实际使用时this指向问题
export class Event {
    // 事件中心
    _events = {}

    /**
     * 订阅事件
     *
     * @param {String} type 事件名称
     * @param {Function} handler 回调函数
     */
    on = (type, handler) => {
        const listener = this._events[type];

        // 如果没有这个事件
        if (!listener) {
            this._events[type] = [handler];
        }

        // 事件已经存在，则继续追加
        if (listener) {
            listener.push(handler);

            // 避免重复订阅相同事件
            this._events[type] = [...new Set(listener)];
        }

        return this;
    }

    /**
     * 订阅事件 - 只触发一次
     *
     * @param {String} type 事件名称
     * @param {Function} handler 回调函数
     */
    once = (type, handler) => {
        // FIXME: 这样外面没有办法取消订阅，会永驻事件中心
        // 需要考虑是不是会造成内存泄漏隐患
        this.on(type, _once(handler));
        return this;
    }

    /**
     * 发布事件
     *
     * @param {String} type 事件名称
     * @param {*} params 发布信息时携带的参数
     */
    emit = (type, ...params) => {
        const listener = this._events[type];

        // 没有订阅该事件类型
        if (!listener || !listener?.length) {
            return this;
        }

        listener.forEach(handlerItem => {
            handlerItem.call(this, ...params);
        });

        return this;
    }

    /**
     * 指定移除订阅事件
     *
     * @param {String} type 事件名称
     * @param {Function} handler 需要移除的回调函数，不传递则移除该事件类型的所有订阅
     */
    remove = (type, handler) => {
        const listener = this._events[type];

        // 移除该事件类型的所有订阅
        if (!handler) {
            this._events[type] = [];
            return this;
        }

        // 该事件类型还没注册，不需要被移除
        if (!listener) {
            return this;
        }

        this._events[type] = listener.filter(handlerItem => handlerItem !== handler);
        return this;
    }

    /**
     * 清除所有订阅事件
     */
    clear = () => {
        this._events = {};
        return this;
    }
}
