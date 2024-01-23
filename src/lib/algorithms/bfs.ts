import { grid } from '$lib/stores/grid';
import { getNodeNeibhours } from '../utils/grid';
import { queue } from '../utils/collections';
import type { AlgorithmOptions } from '$lib/types';

export const bfs = async ({
	startNode,
	isWall,
	isEndNode,
	getNode,
	screen,
	intercept
}: AlgorithmOptions) => {
	const q = queue();

	q.enqueue({ node: startNode, prevNodeKey: null });

	while (!q.isEmpty()) {
		const current = q.dequeue();

		if (!current) {
			return;
		}

		if (isEndNode(current.node)) {
			grid.visitNode(current.node, current.prevNodeKey);
			return;
		} else if (isWall(current.node) || current.node.visited) {
			continue;
		} else {
			grid.visitNode(current.node, current.prevNodeKey);
			await intercept();
		}

		const neibhours = getNodeNeibhours(current.node, screen, getNode);
		const filteredNeibhours = neibhours.filter((node) => !node.visited && !q.has(node.key));

		for (let n of filteredNeibhours) {
			q.enqueue({ node: n, prevNodeKey: current.node.key });
		}
	}

	return;
};
