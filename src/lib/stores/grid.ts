import { writable } from 'svelte/store';
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
    const { subscribe, update, set } = writable(null);

    subscribe(grid => {
        if (grid) {
            const snapshot = [...grid].map(el => ({ key: el[0], node: el[1] }))

            history.update(snapshot)
        }
    })

    const updateNode = (node, data) => {
        return update(currentGrid => {
            const key = toMapKey(node)
            const currentNode = currentGrid.get(key)

            currentGrid.set(key, { ...currentNode, ...data })

            return currentGrid
        })
    }

    const reset = (screen) => {
        history.reset()
        set(_createGrid(screen.row, screen.col))
    }

    return {
        subscribe,
        updateNode,
        reset,
    };
}

export const grid = createGridStore()