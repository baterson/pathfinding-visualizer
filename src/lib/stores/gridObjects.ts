import { get, writable } from 'svelte/store';
import { grid, toMapKey } from './grid';

const getInitialState = () => ({ walls: new Set(), weight: new Map() })

export const createGridObjectsStore = () => {
    const store = writable(getInitialState());

    const isValidNode = (node) => {
        if (node && !node.visited && !isWall(node) && !grid.isStartNode(node) && !grid.isEndNode(node)) {
            return true
        }
        return false
    }

    const isWall = (node) => {
        const key = toMapKey(node)
        return get(store).walls.has(key)
    }

    const addWall = (key) => {
        store.update(current => {
            current.walls.add(key)
            return current
        })
    }


    // const addWall = (node) => {
    //     if (isValidNode(node)) {
    //         store.update(current => {
    //             current.walls.add(toMapKey(node))
    //             return current
    //         })
    //     }
    // }

    const removeWall = (node) => {
        store.update(current => {
            current.walls.delete(toMapKey(node))
            return current
        })
    }

    const incrWeight = (node) => {
        const key = toMapKey(node)

        if (!isValidNode(node)) {
            return
        }

        store.update(current => {
            const nodeWeight = current.weight.get(key)

            if (nodeWeight) {
                current.weight.set(key, Math.min(nodeWeight + 1, 9))
            } else {
                current.weight.set(key, 1)
            }
            return current
        })
    }

    const decrWeight = (node) => {
        const key = toMapKey(node)

        if (!isValidNode(node)) {
            return
        }

        store.update(current => {
            const nodeWeight = current.weight.get(key)

            if (nodeWeight) {
                const nextWeight = nodeWeight - 1

                if (nextWeight > 0) {
                    current.weight.set(key, nextWeight)
                } else {
                    current.weight.delete(key)
                }
            }

            return current
        })
    }

    const getWeight = (node) => {
        const key = toMapKey(node)
        const weightMap = get(store).weight

        return weightMap.get(key) || 0
    }

    const isWeightedNode = (node) => {
        const key = toMapKey(node)
        const weightMap = get(store).weight

        return weightMap.has(key)
    }

    const isObject = (node) => {
        return isWeightedNode(node) || isWall(node)
    }

    const removeObject = (node) => {
        if (isWall(node)) {
            removeWall(node)
        } else if (isWeightedNode(node)) {
            decrWeight(node)
        }
    }

    const reset = () => {
        store.set(getInitialState())
    }

    return {
        subscribe: store.subscribe,
        get: () => get(store),
        reset,
        addWall,
        removeWall,
        isWall,
        getWeight,
        incrWeight,
        decrWeight,
        removeObject,
        isObject
    };
}

export const gridObjects = createGridObjectsStore()
