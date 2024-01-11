import { derived, get, writable } from 'svelte/store';

export const historyTrack = writable(-1)

export const createHistoryStore = () => {
    const history = writable([])

    const stateSnapshot = derived([history, historyTrack], ([$history, $historyTrack]) => {
        return $history[$historyTrack]
    })

    const update = (item) => {
        history.update(current => {
            return [...current, item]
        })
        historyTrack.update(current => {
            return current + 1
        })

    }

    const decrTrack = () => {
        historyTrack.update(current => {
            if (current > 0) {
                return current - 1
            }

            return current
        })
    }

    const incrTrack = () => {
        if (get(historyTrack) < get(history).length - 1) {
            historyTrack.update(current => {
                return current + 1
            })
        }
    }

    const isTrackAtTheEnd = () => {
        return get(historyTrack) === get(history).length - 1
    }

    const reset = () => {
        history.set([])
        historyTrack.set(-1)
    }


    return {
        subscribe: stateSnapshot.subscribe,
        getHistoryTrack: () => get(historyTrack),
        update,
        decrTrack,
        incrTrack,
        reset,
        isTrackAtTheEnd,
    };
}

export const history = createHistoryStore()
