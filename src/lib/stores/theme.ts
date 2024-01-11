import { writable, get } from "svelte/store"

const createThemeStore = () => {
    const store = writable('light')

    return {
        subscribe: store.subscribe,
        set: store.set,
        get: () => get(store),
    }
}

export const theme = createThemeStore()
