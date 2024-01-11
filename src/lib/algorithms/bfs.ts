import { execution } from '$lib/stores/execution';
import { grid } from '$lib/stores/grid';
import { gridObjects } from '$lib/stores/gridObjects';
import { getGridNeibhours, reachBoundary } from './utils/grid';
import { queue } from './utils/collections';

export const bfs = async () => {
    const startNode = grid.getStartNode()
    const q = queue();

    q.enqueue(startNode);

    while (!q.isEmpty()) {
        const currentNode = q.dequeue();

        if (!currentNode) {
            return;
        }

        if (grid.isEndNode(currentNode)) {
            return
        }

        await execution.intercept();

        const neibhours = getGridNeibhours(currentNode);

        for (let nextNode of neibhours) {
            if (nextNode.visited || reachBoundary(nextNode)) {
                continue
            }


            if (gridObjects.isWall(nextNode)) {
                grid.updateNode(nextNode, { visited: true })
            } else {
                grid.updateNode(nextNode, { prevNode: currentNode, visited: true });

                q.enqueue(grid.getNode(nextNode));
            }
        }
    }

    return;
};
