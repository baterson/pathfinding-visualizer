import { grid } from '$lib/stores/grid';
import { getGridNeibhours } from '../utils/grid';
import { queue } from '../utils/collections';
import type { AlgorithmOptions } from '$lib/types';

export const bfs = async ({
	startNode,
	isWall,
	isEndNode,
	getNode,
	screen,
	intercept,
	hitBoundary
}: AlgorithmOptions) => {
	const q = queue();

	q.enqueue(startNode);

	while (!q.isEmpty()) {
		const currentNode = q.dequeue();

		if (!currentNode) {
			return;
		}

		if (isEndNode(currentNode)) {
			return;
		}

		await intercept();

		const neibhours = getGridNeibhours(currentNode, screen, getNode, hitBoundary);

		for (let nextNode of neibhours) {
			if (!nextNode || nextNode.visited || hitBoundary(nextNode)) {
				continue;
			}

			if (isWall(nextNode)) {
				grid.visitNode(nextNode);
			} else {
				grid.visitNode(nextNode, currentNode);

				q.enqueue(getNode(nextNode));
			}
		}
	}

	return;
};
