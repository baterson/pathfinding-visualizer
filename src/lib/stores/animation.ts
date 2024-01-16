import { writable } from "svelte/store"

export const animationQ = writable(new Set())

export const queueAnimationByKey = (key) => animationQ.update(current => {
    current.add(key)
    return current
})

export const removeFromAnimationQByKey = (key) => animationQ.update(current => {
    current.delete(key)
    return current
})
