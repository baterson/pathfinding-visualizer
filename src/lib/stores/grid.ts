import { get, writable } from 'svelte/store';
import { history } from '$lib/stores/history';
import { execution } from '$lib/stores/execution';

export const GRID_COLUMNS = 20
export const GRID_GAP = 2
export const CELL_SIZE = 30

export const createGrid = () => {
    const grid = new Map();

    for (let row = 0; row < GRID_COLUMNS; row++) {
        for (let col = 0; col < GRID_COLUMNS; col++) {
            grid.set(`${row},${col}`, {
                row,
                col,
                wall: false,
                visited: false,
                weight: 1,
                prevNode: null,
                x: (CELL_SIZE * col) + (GRID_GAP * col),
                y: (CELL_SIZE * row) + (GRID_GAP * row)
            });
        }
    }
    return grid;
};

export const toMapKey = (position) => {
    if (!position) {
        return null
    }

    return `${position.row},${position.col}`
}

export const startNodeKey = writable('3,3')
export const getStartNodeKey = () => get(startNodeKey)
export const setStartNodeKey = node => startNodeKey.set(toMapKey(node))

export const endNodeKey = writable('11,7')
export const getEndNodeKey = () => get(endNodeKey)
export const setEndNodeKey = node => endNodeKey.set(toMapKey(node))

const createGridStore = () => {
    const store = writable(createGrid());

    store.subscribe(grid => {
        const snapshot = [...grid].map(el => ({ key: el[0], node: el[1] }))
        history.update(snapshot)
    })

    const getNodeByKey = (key) => {
        return get(store).get(key)
    }

    const updateNode = (node, data) => {
        return store.update(currentGrid => {
            const key = toMapKey(node)
            const currentNode = currentGrid.get(key)

            currentGrid.set(key, { ...currentNode, ...data })

            return currentGrid
        })
    }

    const getNode = (node) => {
        const grid = get(store)
        const key = toMapKey(node)
        return grid.get(key)
    }

    const getNodeByCoordinates = (coordinates) => {
        const { x, y } = coordinates
        console.log('x, y', x, y);

        const result = [...get(store)].find(([_, currentNode]) => {
            const xIntersect = x >= currentNode.x && x <= currentNode.x + CELL_SIZE + GRID_GAP
            const yIntersect = y >= currentNode.y && y <= currentNode.y + CELL_SIZE + GRID_GAP
            return xIntersect && yIntersect
        })
        console.log('result', result ? result[1] : 'NO RESULT');


        return result ? result[1] : null
    }

    const isStartNode = (node) => toMapKey(node) === get(startNodeKey)
    const isEndNode = (node) => toMapKey(node) === get(endNodeKey)
    const getStartNode = () => getNodeByKey(get(startNodeKey))
    const getEndNode = () => getNodeByKey(get(endNodeKey))

    const reset = () => {
        // order matters
        history.reset()
        store.set(createGrid())
    }

    const getShortestPath = async (node) => {
        if (!node) {
            return;
        }

        if (isStartNode(node)) {
            return
        }

        // Don't update path for start or end Node
        if (!isStartNode(node) && !isEndNode(node)) {
            updateNode(node, { path: true });
        }

        try {
            await execution.intercept()
        } catch (e) {
            return
        }

        const prevNode = node.prevNode ? grid.getNode(node.prevNode) : null
        console.log('prevNode', prevNode);


        return getShortestPath(prevNode);
    };


    return {
        subscribe: store.subscribe,
        updateNode,
        getNode,
        getNodeByKey,
        isStartNode,
        isEndNode,
        getStartNode,
        getEndNode,
        getNodeByCoordinates,
        getShortestPath: () => getShortestPath(getEndNode()),
        reset,
    };
}

export const grid = createGridStore()

export const selectedNode = writable(null)
export const getSelectedNode = () => get(selectedNode)
export const setSelectedNode = (node) => selectedNode.set(node)
