import { get, writable } from "svelte/store"
import { toMapKey } from "./grid"
import { execution } from "./execution"

// Start Node
export const startNodeKey = writable('3,3')
export const getStartNodeKey = () => get(startNodeKey)
export const setStartNodeKey = key => startNodeKey.set(key)
export const isStartNode = node => get(startNodeKey) === toMapKey(node)

export const startNode = writable({ row: 3, col: 3 })

export const endNode = writable({ row: 5, col: 5 })

// export const getStartNodeKey = () => get(startNodeKey)
// export const setStartNodeKey = key => startNodeKey.set(key)
// export const isStartNode = node => get(startNodeKey) === toMapKey(node)

// End Node
export const endNodeKey = writable('7,7')
export const getEndNodeKey = () => get(endNodeKey)
export const setEndNodeKey = key => endNodeKey.set(key)
export const isEndNode = node => get(endNodeKey) === toMapKey(node)

// Selected Start/End
export const selectedNode = writable(null)
export const getSelectedNode = () => get(selectedNode)
export const setSelectedNode = (node) => selectedNode.set(node)


export const placeSelectedNode = (selectedNode, destination, startNode, endNode) => {
    const node = getSelectedNode()
    // const startNode = getStartNodeKey()
    // const endNode = getEndNodeKey()

    // if (node === startNode && destination !== endNode) {
    //     setStartNodeKey(destination)
    //     setSelectedNode(null)
    // } else if (node === endNode && destination !== endNode) {
    //     setEndNodeKey(destination)
    //     setSelectedNode(null)
    // }
}

export const isEqualNodes = (a, b) => toMapKey(a) === toMapKey(b)

// Walls
export const walls = writable(new Set())
export const updateWalls = key => walls.update(current => {
    current.add(key)
    return current
})
export const removeWall = key => walls.update(current => {
    current.delete(key)
    return current
})

export const isWallByKey = key => get(walls).has(key)
export const isWall = node => isWallByKey(toMapKey(node))

// Weight
export const weight = writable(new Map())
export const updateWeight = (key) => {
    weight.update((current) => {
        const weightedNode = current.get(key)
        if (weightedNode) {
            current.set(key, Math.min(9, weightedNode + 1))
        } else {
            current.set(key, 1)
        }

        return current
    })
}
export const removeWeight = (key) => {
    weight.update(current => {
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
}


// Shortest path

// TODO: Move path to Grid because it's in history
export const path = writable(new Set())

const updatePath = key => path.update(current => current.add(key))

export const resetPath = () => path.set(new Set())

export const drawShortestPath = async (node) => {
    if (!node) {
        return;
    }
    if (isStartNode(node)) {
        return
    }

    // // Don't update path for start or end Node
    if (!isStartNode(node) && !isEndNode(node)) {
        updatePath(toMapKey(node))
    }

    try {
        await execution.intercept()
    } catch (e) {
        return
    }

    return drawShortestPath(node.prevNode || null);
};


export const resetNodes = () => {
    walls.set(new Set())
    weight.set(new Map())
    path.set(new Set())
}