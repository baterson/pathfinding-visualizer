import { get, writable } from 'svelte/store';
import { grid } from './grid';
import { algorithms } from '$lib/algorithms';
import { execution } from './execution';

const INITIAL_STATE = { state: 'notStarted', selected: 'aStar' }

export const createAlgorithmStore = () => {
    const store = writable(INITIAL_STATE);

    const update = (value) => store.update(current => ({
        ...current,
        ...value
    }))

    const isFinished = () => get(store).state === 'finished'
    const isStarted = () => get(store).state === 'started'

    const reset = () => {
        update({ state: 'notStarted' })
    }

    const startAlgorithm = async () => {
        const { selected } = get(store)

        execution.reset()
        grid.reset()

        try {
            update({ state: 'started' })

            await algorithms[selected]();

            await grid.getShortestPath();

            update({ state: 'finished' })
        } catch (e) {
            reset()
        }
    }

    const playAlgorithm = async () => {
        const { state } = get(algorithm)

        if (state === 'notStarted' || state === 'finished') {
            // TODO: handle cancel wrapper on try/catch
            try {
                await algorithm.startAlgorithm();
            } catch (e) {
                console.log('Execution canceled');
            }
        } else {
            execution.play();
        }
    };


    return {
        subscribe: store.subscribe,
        get: () => get(store),
        update,
        reset,
        isFinished,
        isStarted,
        startAlgorithm,
        playAlgorithm,
    };
}

export const algorithm = createAlgorithmStore()
