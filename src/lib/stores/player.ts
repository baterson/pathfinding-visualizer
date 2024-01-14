import { writable, get } from 'svelte/store';

const speedValues = [1, 10, 30, 50]

export const speedDisplayNames = {
    1: '2x',
    10: '1x',
    30: '0.5x',
    50: '0.25x'
}

// Refactor to one state var from 3
const INITIAL_STATE = { speed: 10, state: 'notStarted' }

export const lastCancel = writable(null)


export const createPlayerStore = () => {
    const store = writable(INITIAL_STATE);

    const play = () => {
        store.update(current => {
            if (current.state === 'play') {
                current.state = 'pause'
            } else {
                current.state = 'play'
            }
        })
    }

    const updateState = (state) => store.update(current => {
        current.state = state
    })


    const setInForward = () => {
        updateState('inForward')
    }

    const setInBackward = () => {
        updateState('inBackward')
    }

    const setSpeed = (speed) => {
        store.update(current => ({ ...current, speed }))
    }

    const incrSpeed = () => {
        store.update(current => {
            const index = speedValues.indexOf(current.speed)
            if (index < 3) {
                current.speed = speedValues[index + 1]
            }

            return current
        })
    }

    const decrSpeed = () => {
        store.update(current => {
            const index = speedValues.indexOf(current.speed)
            if (index > 0) {
                current.speed = speedValues[index - 1]
            }

            return current
        })
    }

    const reset = () => {
        // const cancelEval = get(lastCancel)
        // if (cancelEval) {
        //     cancelEval()
        // }
        store.update(current => ({ state: 'notStarted', speed: current.speed }))
    }



    return {
        subscribe: store.subscribe,
        update: store.update,
        get: () => get(store),
        play,
        setInForward,
        setInBackward,
        setSpeed,
        incrSpeed,
        decrSpeed,
        reset,
    };
}

export const player = createPlayerStore()

