import {extend, isObject} from "@vue/shared";
import {reactive, readonly} from "./reactive";

const get = createGetter()
const shallowGet = createGetter(false, true)
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true)
const set = createSetter()
const shallowSet = createSetter(true)

function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver);
        if(!isReadonly){

        }
        if(shallow){
            return res;
        }
        if(isObject(res)){
            return isReadonly? readonly(res):reactive(res);
        }
        return res;
    }
}

function createSetter(isReadonly = false) {
    return function set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver);
        return result;
    }
}

export const mutableHandlers = {get, set}
export const shallowReactiveHandlers = {get: shallowGet, set: shallowSet}
let readonlyObj = {
    set: (target, key) => {
        console.log(`set on key ${key} failed`);

    }
}
export const readonlyHandlers = extend({
    get: readonlyGet
}, readonlyObj)
export const shallowReadonlyHandlers = extend({
    get: shallowReadonlyGet
}, readonlyObj)
