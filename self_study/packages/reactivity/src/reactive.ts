import { isObject } from "@vue/shared"

const reactiveHandlers = {}
const shallowReactiveHandlers = {}
const readonlyHandlers = {}
const shallowReadonlyHandlers = {}

export function reactive(target) {
    createReactObj(target, false, reactiveHandlers)
}
export function shallowReactive(target) {
    createReactObj(target, false, shallowReactiveHandlers)
}
export function readonly(target) {
    createReactObj(target, true, readonlyHandlers)
}
export function shallowReadonly(target) {
    createReactObj(target, true, shallowReadonlyHandlers)
}
const reactiveMap = new WeakMap()
const readonlyMap = new WeakMap()
function createReactObj(target, isReadonly, baseHandlers) {
    if (!isObject(target)) {
        return target
    }
    const proxyMap = isReadonly ? readonlyMap : reactiveMap
    const proxyEs = proxyMap.get(target)
    if (proxyEs) {
        return proxyEs
    }
    const proxy = new Proxy(target, baseHandlers)
    proxyMap.set(target, proxy)
    return proxy
}
