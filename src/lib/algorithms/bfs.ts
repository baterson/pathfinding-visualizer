import { grid } from '$lib/stores/grid';
import { getGridNeibhours } from './utils/grid';
import { queue } from './utils/collections';

export const bfs = async ({
    startNode,
    isWall,
    isEndNode,
    getNode,
    screen,
    intercept,
    hitPlayerBoundary
}) => {
    const q = queue();

    q.enqueue(startNode);

    while (!q.isEmpty()) {
        const currentNode = q.dequeue();

        if (!currentNode) {
            return;
        }

        if (isEndNode(currentNode)) {
            return
        }

        await intercept();

        const neibhours = getGridNeibhours(currentNode, getNode, screen, hitPlayerBoundary);


        for (let nextNode of neibhours) {
            if (nextNode.visited || hitPlayerBoundary(nextNode)) {
                continue
            }


            if (isWall(nextNode)) {
                grid.updateNode(nextNode, { visited: true })
            } else {
                grid.updateNode(nextNode, { prevNode: currentNode, visited: true });

                q.enqueue(grid.getNode(nextNode));
            }
        }
    }

    return;
};
