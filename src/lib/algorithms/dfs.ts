import { execution } from '$lib/stores/execution';
import { grid } from '$lib/stores/grid';
import { gridObjects } from '$lib/stores/gridObjects';
import { reachBoundary } from './utils/grid';

const checkNode = (node) => {
    if (!node || gridObjects.isWall(node) || reachBoundary(node) || node.visited) {
        return null
    }
    return node
}

const getTopNode = (node) => {
    const { row, col } = node
    const nextNode = grid.getNode({ row: row - 1, col })

    return checkNode(nextNode)

}

const getRightNode = (node) => {
    const { row, col } = node
    const nextNode = grid.getNode({ row: row, col: col + 1 })

    return checkNode(nextNode)
}

const getBottomNode = (node) => {
    const { row, col } = node
    const nextNode = grid.getNode({ row: row + 1, col: col })

    return checkNode(nextNode)
}

const getLeftNode = (node) => {
    const { row, col } = node
    const nextNode = grid.getNode({ row: row, col: col - 1 })

    return checkNode(nextNode)
}

const getNextNode = (node) => {
    const nextNode = getTopNode(node) || getRightNode(node) || getBottomNode(node) || getLeftNode(node)
    return nextNode
}

const traverseNodes = async (node) => {
    if (grid.isEndNode(node) || !node) {
        return
    }

    const nextNode = getNextNode(node)

    grid.updateNode(node, { visited: true })

    if (nextNode) {
        await execution.intercept()

        grid.updateNode(nextNode, { prevNode: node })
        const nodeUpdated = grid.getNode(nextNode)

        return traverseNodes(nodeUpdated)
    } else {
        return traverseNodes(grid.getNode(node.prevNode))
    }
}


export const dfs = async () => {
    const startNode = grid.getStartNode()

    await traverseNodes(startNode);

    return;
};
