import { grid } from '$lib/stores/grid';
import { getGridNeibhours } from '../utils/grid';
import { minQueue } from '../utils/collections';
import type { AlgorithmOptions } from '$lib/types'

export const dijkstra = async ({ startNode, isEndNode, isWall, getNode, getWeight, screen, intercept, hitBoundary }: AlgorithmOptions) => {
    const q = minQueue();

    q.enqueue({ node: startNode, weight: 0 });

    while (!q.isEmpty()) {
        const current = q.dequeue();
        if (!current) {
            return;
        }

        const { node: currentNode, weight: currentWeight } = current

        if (isEndNode(currentNode)) {
            return
        }

        await intercept();

        const neibhours = getGridNeibhours(currentNode, screen, getNode, hitBoundary);

        for (let nextNode of neibhours) {
            if (!nextNode || nextNode.visited) {
                continue
            }

            if (isWall(nextNode)) {
                grid.visitNode(nextNode)
            } else {
                const neibhourWeight = getWeight(nextNode) + currentWeight + 1

                grid.visitNode(nextNode, currentNode);

                q.enqueue({ node: getNode(nextNode), weight: neibhourWeight });
            }
        }
    }

    return;
};
