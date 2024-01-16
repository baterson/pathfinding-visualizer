// Refactor grid neibhours

export const getGridNeibhours = (node, getNode, screen, hitBoundaries) => {
    const { row, col } = node

    let left, top, right, bottom;

    if (row === screen.row - 1 && col === screen.col) {
        return [];
    }

    if (col !== 0) {
        left = getNode({ row, col: col - 1 })
    }

    if (row !== 0) {
        top = getNode({ row: row - 1, col });
    }

    if (col + 1 < screen.col) {
        right = getNode({ row, col: col + 1 });
    }

    if (row + 1 < screen.row) {
        bottom = getNode({ row: row + 1, col });
    }

    return [left, top, right, bottom].filter((el) => el)
};

export const isEqualNodes = (a, b) => a.row === b.row && a.row === b.row