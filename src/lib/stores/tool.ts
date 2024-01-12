import { get, writable } from "svelte/store"
import { execution } from "./execution"
import { setSelectedNode } from "./nodes"

// TODO Rename to tools

const createToolStore = () => {
    const store = writable(null)

    const setTool = (tool) => {
        setSelectedNode(null)

        store.update((current) => {
            if (current === tool) {
                return null
            } else if (tool === 'reset') {
                // gridObjects.reset()
                execution.reset()
                return tool
            } else {
                return tool
            }
        })

        // if (tool === 'reset') {
        //     requestAnimationFrame(() => {
        //         requestAnimationFrame(() => {
        //             store.set(null)
        //         })
        //     })
        // }
    }

    return {
        subscribe: store.subscribe,
        set: setTool,
        get: () => get(store)
    }
}

export const tool = createToolStore()