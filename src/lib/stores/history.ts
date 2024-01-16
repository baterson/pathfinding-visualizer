import { derived, writable } from 'svelte/store';

const createHistoryStore = () => {
    const { subscribe, update, set } = writable([])

    return {
        subscribe,
        update: (item) => {
            update(current => {
                return [...current, item]
            })

            historyTrack.update(current => {
                return current + 1
            })
        },
        decrTrack: () => {
            historyTrack.update(current => {
                if (current > 0) {
                    return current - 1
                }

                return current
            })
        },
        incrTrack: () => {
            historyTrack.update(current => {
                return current + 1
            })
        },
        reset: () => {
            set([])
            historyTrack.set(-1)
        }
    }
}

export const historyTrack = writable(-1)

export const history = createHistoryStore()

export const gridSnapshot = derived([history, historyTrack], ([$history, $historyTrack]) => {
    return $history[$historyTrack]
})

export const trackAtTheEnd = derived([history, historyTrack], ([$history, $historyTrack]) => {
    return $historyTrack === $history.length - 1
})