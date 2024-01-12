import { writable } from 'svelte/store';
import { tick } from 'svelte';

const INITIAL_STATE = { screen: { row: 0, col: 0 }, playerHeight: 0, isCalculating: true }

const createLayoutStore = () => {
    // TODO: Add on resize window handler
    const store = writable(INITIAL_STATE);

    const setLayout = () => {
        const wW = window.innerWidth;
        const wH = window.innerHeight;
        const emptyVerticalSpace = wH % 32
        const col = Math.round(wW / 32)
        const row = Math.round(wH / 32)
        const playerRows = Math.max(4, Math.round(row / 5))
        const playerHeight = playerRows * 32 + emptyVerticalSpace

        store.update(current => {
            current.screen.row = row
            current.screen.col = col
            current.playerHeight = playerHeight
            return current
        })

        tick().then(() => {
            store.update(current => {
                current.isCalculating = false
                return current
            })
        })
    }

    return {
        subscribe: store.subscribe,
        setLayout
    }
}

export const layout = createLayoutStore()
