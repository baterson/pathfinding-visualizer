import { grid } from '$lib/stores/grid';
import { getGridNeibhours } from '../utils/grid';
import { minQueue } from '../utils/collections';

const getHeuristic = (node, endNode) => {
    return Math.abs(endNode.row - node.row) + Math.abs(endNode.col - node.col)
}

export const aStar = async ({ startNode,
    endNode,
    isWall,
    isEndNode,
    getNode,
    getWeight,
    screen,
    hitBoundaries,
    intercept
}) => {
    const q = minQueue();

    q.enqueue({ node: startNode, weight: getHeuristic(startNode, endNode) });

    while (!q.isEmpty()) {
        const { node: currentNode } = q.dequeue();

        if (!currentNode) {
            return;
        }


        if (isEndNode(currentNode)) {
            return
        }

        await intercept();

        const neibhours = getGridNeibhours(currentNode, getNode, screen);

        for (let nextNode of neibhours) {

            if (nextNode.visited) {
                continue
            }

            if (isWall(nextNode)) {

                grid.updateNode(nextNode, { visited: true })
            } else {
                const neibhourWeight = getWeight(nextNode) + getHeuristic(nextNode, endNode) + 1

                grid.updateNode(nextNode,
                    {
                        visited: true,
                        prevNode: currentNode,
                    }
                );

                q.enqueue({ node: getNode(nextNode), weight: neibhourWeight });
            }
        }
    }

    return;
};
