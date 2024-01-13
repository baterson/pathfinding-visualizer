import { execution } from '$lib/stores/execution';
import { grid } from '$lib/stores/grid';
import { isWall, isEndNode } from '$lib/stores/nodes';
import { getGridNeibhours, isEqualNodes } from './utils/grid';
import { minQueue } from './utils/collections';

const getHeuristic = (node, endNode) => {
    return Math.abs(endNode.row - node.row) + Math.abs(endNode.col - node.col)
}

export const aStar = async ({ startNode, endNode, isWall, isEndNode, getNode, screen }) => {
    const q = minQueue();

    q.enqueue(startNode);

    while (!q.isEmpty()) {
        const currentNode = q.dequeue();

        if (!currentNode) {
            return;
        }

        console.log('end', endNode);


        if (isEndNode(currentNode)) {
            console.log('----END NODE:', currentNode);

            return
        }

        await execution.intercept();

        const neibhours = getGridNeibhours(currentNode, getNode, screen);

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
