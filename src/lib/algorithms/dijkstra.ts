import { execution } from '$lib/stores/execution';
import { grid } from '$lib/stores/grid';
import { getGridNeibhours } from './utils/grid';
import { minQueue } from './utils/collections';

export const dijkstra = async ({ startNode, isEndNode, isWall, getNode, getWeight, screen }) => {
    const q = minQueue();

    q.enqueue({ node: startNode, weight: 0 });

    while (!q.isEmpty()) {
        const { node: currentNode, weight: currentWeight } = q.dequeue();

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
                const neibhourWeight = getWeight(nextNode) + currentWeight + 1

                grid.updateNode(nextNode,
                    {
                        visited: true,
                        prevNode: currentNode,
                    }
                );

                q.enqueue({ node: grid.getNode(nextNode), weight: neibhourWeight });
            }
        }
    }

    return;
};
