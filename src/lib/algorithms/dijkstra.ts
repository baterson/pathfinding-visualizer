import { execution } from '$lib/stores/execution';
import { grid } from '$lib/stores/grid';
import { getGridNeibhours } from './utils/grid';
import { minQueue } from './utils/collections';

export const dijkstra = async ({ startNode, isEndNode, isWall, getNode, screen }) => {
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

        const neibhours = getGridNeibhours(currentNode, getNode, screen);

        for (let nextNode of neibhours) {
            if (nextNode.visited) {
                continue
            }

            if (isWall(nextNode)) {
                grid.updateNode(nextNode, { visited: true })
            } else {
                // const nodeWeight = gridObjects.getWeight(nextNode)

                grid.updateNode(nextNode,
                    {
                        visited: true,
                        prevNode: currentNode,
                        weight: 1
                    }
                );

                q.enqueue(grid.getNode(nextNode));
            }
        }
    }

    return;
};
