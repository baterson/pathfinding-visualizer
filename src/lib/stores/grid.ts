import { get, writable } from 'svelte/store';
import { history } from '$lib/stores/history';

export const GRID_COLUMNS = 20
export const GRID_GAP = 2
export const CELL_SIZE = 30

export const _createGrid = (rows, columns) => {
    const grid = new Map();

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            grid.set(`${row},${col}`, {
                row,
                col,
                // wall: false,
                // weight: 1,
                visited: false,
                prevNode: null,
                path: false,
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

const createGridStore = () => {

    const store = writable(null);

    store.subscribe(grid => {
        // IF grid
        if (grid) {
            const snapshot = [...grid].map(el => ({ key: el[0], node: el[1] }))
            history.update(snapshot)
        }
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

    const createGrid = (row, col) => {
        history.reset()
        store.set(_createGrid(row, col))
    }

    return {
        subscribe: store.subscribe,
        createGrid,
        updateNode,
        getNode,
        getNodeByKey,
        getNodeByCoordinates,
    };
}

export const grid = createGridStore()