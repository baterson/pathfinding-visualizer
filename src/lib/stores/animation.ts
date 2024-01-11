import { get, writable } from "svelte/store"
import { toMapKey } from "./grid"

export const animationQ = writable(new Set())

export const queueAnimation = (node) => animationQ.update(current => {
    current.add(toMapKey(node))
    return current
})

export const queueAnimationByKey = (key) => animationQ.update(current => {
    current.add(key)
    return current
})

export const removeFromAnimationQ = (node) => animationQ.update(current => {
    current.delete(toMapKey(node))
    return current
})

export const removeFromAnimationQByKey = (key) => animationQ.update(current => {
    current.delete(key)
    return current
})

export const isNodeInQ = (key) => get(animationQ).has(key)

export const runSvelte = writable(true)