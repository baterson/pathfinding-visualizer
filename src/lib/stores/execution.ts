import { writable, get } from 'svelte/store';
import { history } from '$lib/stores/history'
import { grid } from './grid';
import { algorithm } from './algorithm';

const speedValues = [1, 10, 30, 50]

export const speedDisplayNames = {
    1: '2x',
    10: '1x',
    30: '0.5x',
    50: '0.25x'
}

const INITIAL_STATE = { isPaused: false, inForward: false, inBackward: false, speed: 1 }

export const createExecutionStore = () => {
    const store = writable(INITIAL_STATE);
    const lastCancel = writable(null)

    const play = () => {
        store.update(current => ({ ...current, isPaused: !current.isPaused }))
    }

    const setInForward = (inForward) => {
        store.update(current => ({ ...current, inForward, isPaused: true }))
    }

    const setInBackward = (inBackward) => {
        store.update(current => ({ ...current, inBackward, isPaused: true }))
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
        const cancelEval = get(lastCancel)
        if (cancelEval) {
            cancelEval()
        }
        store.update(current => ({ ...INITIAL_STATE, speed: current.speed }))
        grid.reset()
        algorithm.reset()
    }


    const wait = (isCanceled) => {
        let tickToWait = get(store).speed

        return new Promise((res, rej) => {
            const cb = () => {
                if (isCanceled()) {
                    return rej()
                }

                if (tickToWait === 0) {
                    return res()
                } else {
                    tickToWait -= 1
                    return requestAnimationFrame(cb)
                }
            }

            return requestAnimationFrame(cb)
        })
    }



    const pause = async (isCanceled) => {
        return new Promise((res, rej) => {
            const cb = () => {

                if (isCanceled()) {
                    return rej()
                }


                const storeState = get(store)
                const { decrTrack, incrTrack, isTrackAtTheEnd } = history

                if (!storeState.isPaused) {
                    return res()
                }

                if (storeState.inForward) {
                    if (isTrackAtTheEnd()) {
                        setInForward(false)
                        // Tracking ended continue execution
                        return res()
                    } else {
                        incrTrack()
                        setInForward(false)
                        return requestAnimationFrame(cb)
                    }

                } else if (storeState.inBackward) {
                    setInBackward(false)
                    decrTrack()
                    return requestAnimationFrame(cb)
                } else {
                    return requestAnimationFrame(cb)
                }
            }
            return requestAnimationFrame(cb)
        })
    }

    const restoreHistory = (isCanceled) => {
        return new Promise((res, rej) => {
            const cb = async () => {
                if (isCanceled()) {
                    return rej()
                }

                const { incrTrack, isTrackAtTheEnd } = history

                if (store.isPaused) {
                    return res()
                }

                if (isTrackAtTheEnd()) {
                    return res()
                } else {
                    await wait(isCanceled)

                    if (isCanceled()) {
                        return rej()
                    }

                    incrTrack()
                    return requestAnimationFrame(cb)
                }
            }

            return requestAnimationFrame(cb)
        })
    }

    const cancelablePromise = () => {
        let _canceled = false
        const isCanceled = () => _canceled
        const cancel = () => _canceled = true

        return [cancel, (cb) => {
            return new Promise((res, rej) => {
                return cb(res, rej, isCanceled)
            })
        }]
    }

    const intercept = () => {
        const [cancel, Cancelable] = cancelablePromise()

        const executor = async (res, rej, isCanceled) => {
            if (isCanceled()) {
                rej()
            }

            const executionState = get(store)
            const { isTrackAtTheEnd } = history

            if (executionState.isPaused) {
                try {
                    await pause(isCanceled)
                } catch (e) {
                    return rej()
                }

                return res()
            } else if (!isTrackAtTheEnd()) {
                await restoreHistory(isCanceled)
                return res()
            } else {
                try {
                    await wait(isCanceled)
                    return res()
                } catch (e) {
                    return rej()
                }
            }
        }

        // TODO: check return with request anim
        return [cancel, () => Cancelable(executor)]
    }

    return {
        subscribe: store.subscribe,
        update: store.update,
        get: () => get(store),
        intercept: () => {
            // move cancelable promise
            const [cancel, Intercept] = intercept()
            lastCancel.set(cancel)
            return Intercept()
        },
        play,
        setInForward,
        setInBackward,
        setSpeed,
        incrSpeed,
        decrSpeed,
        reset,
    };
}

export const execution = createExecutionStore()

