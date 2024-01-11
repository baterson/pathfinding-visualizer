import { GRID_COLUMNS, grid } from "$lib/stores/grid";

export const getBoundaries = () => {
    const coordinates = {
        x: window.innerWidth,
        y: window.innerHeight
    }
    console.log('asdasd');

    // TODO:  RETURN FROM LOAD computed from width
    const { row, col } = grid.getNodeByCoordinates(coordinates)
    // console.log('row, col', row, col);


    return { row: row, col: col }
}

export const reachBoundary = (node, boundaries) => {
    // if (node.row > boundaries.row || node.col > boundaries.col) {
    //     return true
    // }

    return false
}


export const getGridNeibhours = (node) => {
    const { row, col } = node

    let left, top, right, bottom;

    if (row === GRID_COLUMNS - 1 && col === GRID_COLUMNS - 1) {
        return [];
    }

    if (col !== 0) {
        left = grid.getNode({ row, col: col - 1 })
    }

    if (row !== 0) {
        top = grid.getNode({ row: row - 1, col });
    }

    if (col + 1 < GRID_COLUMNS) {
        right = grid.getNode({ row, col: col + 1 });
    }

    if (row + 1 < GRID_COLUMNS) {
        bottom = grid.getNode({ row: row + 1, col });
    }

    return [left, top, right, bottom].filter((el) => el)
};
