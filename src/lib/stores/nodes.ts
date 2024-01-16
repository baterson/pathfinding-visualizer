import { writable } from "svelte/store"

// Walls
const createWallsStore = () => {
    const { subscribe, update, set } = writable(new Set())
    return {
        subscribe,
        addWall: key => update(current => {
            current.add(key)
            return current
        }),
        removeWall: key => update(current => {
            current.delete(key)
            return current
        }),
        reset: () => set(new Set())
    }

}

const createWeightStore = () => {
    const { subscribe, update, set } = writable(new Map())
    return {
        subscribe,
        addWeight: (key) => {
            update((current) => {
                const weightedNode = current.get(key)
                if (weightedNode) {
                    current.set(key, Math.min(9, weightedNode + 1))
                } else {
                    current.set(key, 1)
                }

                return current
            })
        },
        removeWeight: (key) => {
            update(current => {
                const weightedNode = current.get(key)

                if (!weightedNode) {
                    return
                }

                const nextWeight = weightedNode - 1
                console.log('nextWeight', nextWeight);

                if (nextWeight <= 0) {
                    current.delete(key)
                } else {
                    current.set(key, nextWeight)
                }
                return current
            })
        },
        reset: () => set(new Map())
    }
}

// Start Node
export const startNodeKey = writable('3,3')

// End Node
export const endNodeKey = writable('7,7')

// Selected Start/End
export const selectedNodeKey = writable(null)

export const walls = createWallsStore()
export const weight = createWeightStore()

export const resetNodes = () => {
    walls.reset()
    weight.reset()
}