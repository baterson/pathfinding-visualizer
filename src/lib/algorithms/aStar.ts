import { execution } from '$lib/stores/execution';
import { grid } from '$lib/stores/grid';
import { gridObjects } from '$lib/stores/gridObjects';
import { getGridNeibhours, reachBoundary, getBoundaries } from './utils/grid';
import { minQueue } from './utils/collections';

const getHeuristic = (node, endNode) => {
    return Math.abs(endNode.row - node.row) + Math.abs(endNode.col - node.col)
}

export const aStar = async () => {
    const startNode = grid.getStartNode()
    const endNode = grid.getEndNode()
    // const boundaries = getBoundaries()
    // console.log('boundaries', getBoundaries());

    const q = minQueue();

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
        console.log('neibhours', neibhours);


        for (let nextNode of neibhours) {
            console.log('nnnn', nextNode);
            // reachBoundary(nextNode, boundaries)

            if (nextNode.visited) {
                console.log('before cont', nextNode);

                continue
            }
            console.log('after cont', nextNode);

            if (gridObjects.isWall(nextNode)) {
                grid.updateNode(nextNode, { visited: true })
            } else {
                const nodeWeight = gridObjects.getWeight(nextNode)
                const heuristic = getHeuristic(nextNode, endNode)
                console.log('heuristic', heuristic);

                grid.updateNode(nextNode,
                    {
                        visited: true,
                        prevNode: currentNode,
                        weight: heuristic + nodeWeight
                    }
                );

                q.enqueue(grid.getNode(nextNode));
            }
        }
    }

    return;
};
