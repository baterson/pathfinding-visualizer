import { execution } from '$lib/stores/execution';
import { grid } from '$lib/stores/grid';
import { isWall, isEndNode } from '$lib/stores/nodes';
import { getGridNeibhours } from './utils/grid';
import { minQueue } from './utils/collections';

const getHeuristic = (node, endNode) => {
    return Math.abs(endNode.row - node.row) + Math.abs(endNode.col - node.col)
}

export const aStar = async (startNode, endNode) => {
    const q = minQueue();

    q.enqueue(startNode);

    while (!q.isEmpty()) {
        const currentNode = q.dequeue();

        if (!currentNode) {
            return;
        }

        if (isEndNode(currentNode)) {

            return
        }

        await execution.intercept();

        const neibhours = getGridNeibhours(currentNode);

        for (let nextNode of neibhours) {

            if (nextNode.visited) {
                continue
            }

            if (isWall(nextNode)) {

                grid.updateNode(nextNode, { visited: true })
            } else {
                // const nodeWeight = gridObjects.getWeight(nextNode)
                const heuristic = getHeuristic(nextNode, endNode)

                grid.updateNode(nextNode,
                    {
                        visited: true,
                        prevNode: currentNode,
                        weight: heuristic + 0
                    }
                );

                q.enqueue(grid.getNode(nextNode));
            }
        }
    }

    return;
};
