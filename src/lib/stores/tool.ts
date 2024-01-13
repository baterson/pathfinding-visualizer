import { writable } from "svelte/store"

export const tool = writable(null)
export const setTool = (name) => {
    tool.update(current => {
        if (name === current) {
            return null
        }
        return name
    })
}