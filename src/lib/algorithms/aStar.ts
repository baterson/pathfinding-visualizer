import { grid } from '$lib/stores/grid';
import { getGridNeibhours } from '../utils/grid';
import { minQueue } from '../utils/collections';
import type { AlgorithmOptions, Node } from '$lib/types';

const getHeuristic = (node: Node, endNode: Node) => {
	return Math.abs(endNode.row - node.row) + Math.abs(endNode.col - node.col);
};

export const aStar = async ({
	startNode,
	endNode,
	isWall,
	isEndNode,
	getNode,
	getWeight,
	screen,
	hitBoundary,
	intercept
}: AlgorithmOptions) => {
	const q = minQueue();

	q.enqueue({ node: startNode, weight: getHeuristic(startNode, endNode) });

	while (!q.isEmpty()) {
		const current = q.dequeue();
		if (!current) {
			return;
		}

		const { node: currentNode } = current;

		if (isEndNode(currentNode)) {
			return;
		}

		await intercept();

		const neibhours = getGridNeibhours(currentNode, screen, getNode, hitBoundary);

		for (let nextNode of neibhours) {
			if (!nextNode || nextNode.visited) {
				continue;
			}

			if (isWall(nextNode)) {
				grid.visitNode(nextNode);
			} else {
				const neibhourWeight = getWeight(nextNode) + getHeuristic(nextNode, endNode) + 1;

				grid.visitNode(nextNode, currentNode);

				q.enqueue({ node: getNode(nextNode), weight: neibhourWeight });
			}
		}
	}

	return;
};
