import { execution } from '$lib/stores/execution';
import { grid } from '$lib/stores/grid';

export const startDfs = ({ startNode, isWall, isEndNode, getNode }) => {

    const checkNode = (node) => {
        if (!node || isWall(node) || node.visited) {
            return null
        }
        return node
    }

    const getTopNode = (node) => {
        const { row, col } = node
        const nextNode = getNode({ row: row - 1, col })

        return checkNode(nextNode)

    }

    const getRightNode = (node) => {
        const { row, col } = node
        const nextNode = getNode({ row: row, col: col + 1 })

        return checkNode(nextNode)
    }

    const getBottomNode = (node) => {
        const { row, col } = node
        const nextNode = getNode({ row: row + 1, col: col })

        return checkNode(nextNode)
    }

    const getLeftNode = (node) => {
        const { row, col } = node
        const nextNode = getNode({ row: row, col: col - 1 })

        return checkNode(nextNode)
    }

    const getNextNode = (node) => {
        const nextNode = getTopNode(node) || getRightNode(node) || getBottomNode(node) || getLeftNode(node)
        return nextNode
    }


    const dfs = async (node) => {
        console.log('node', node);

        if (isEndNode(node) || !node) {
            return
        }

        const nextNode = getNextNode(node)
        console.log('nex', nextNode);


        grid.updateNode(node, { visited: true })

        if (nextNode) {
            await execution.intercept()

            grid.updateNode(nextNode, { prevNode: node })
            const nodeUpdated = getNode(nextNode)

            return dfs(nodeUpdated)
        } else {
            return dfs(getNode(node.prevNode))
        }
    };

    return dfs(startNode)
}