var VueReactivity = (function (exports) {
    'use strict';

    const isObject = value => typeof value == 'object' && value !== null;
    const extend = Object.assign;

    const get = createGetter();
    const shallowGet = createGetter(false, true);
    const readonlyGet = createGetter(true);
    const shallowReadonlyGet = createGetter(true, true);
    const set = createSetter();
    const shallowSet = createSetter(true);
    function createGetter(isReadonly = false, shallow = false) {
        return function get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver);
            if (shallow) {
                return res;
            }
            if (isObject(res)) {
                return isReadonly ? readonly(res) : reactive(res);
            }
            return res;
        };
    }
    function createSetter(isReadonly = false) {
        return function set(target, key, value, receiver) {
            const result = Reflect.set(target, key, value, receiver);
            return result;
        };
    }
    const mutableHandlers = { get, set };
    const shallowReactiveHandlers = { get: shallowGet, set: shallowSet };
    let readonlyObj = {
        set: (target, key) => {
            console.log(`set on key ${key} failed`);
        }
    };
    const readonlyHandlers = extend({
        get: readonlyGet
    }, readonlyObj);
    const shallowReadonlyHandlers = extend({
        get: shallowReadonlyGet
    }, readonlyObj);

    function reactive(target) {
        return createReactiveObject(target, false, mutableHandlers);
    }
    function shallowReactive(target) {
        return createReactiveObject(target, false, shallowReactiveHandlers);
    }
    function readonly(target) {
        return createReactiveObject(target, false, readonlyHandlers);
    }
    function shallowReadonly(target) {
        return createReactiveObject(target, false, shallowReadonlyHandlers);
    }
    const reactiveMap = new WeakMap();
    const readonlyMap = new WeakMap();
    function createReactiveObject(target, isReadonly, baseHandlers) {
        if (!isObject(target)) {
            return target;
        }
        const proxyMap = isReadonly ? readonlyMap : reactiveMap;
        const existProxy = proxyMap.get(target);
        if (existProxy) {
            return existProxy;
        }
        const proxy = new Proxy(target, baseHandlers);
        proxyMap.set(target, proxy);
        return proxy;
    }

    exports.reactive = reactive;
    exports.readonly = readonly;
    exports.shallowReactive = shallowReactive;
    exports.shallowReadonly = shallowReadonly;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
//# sourceMappingURL=reactivity.global.js.map
