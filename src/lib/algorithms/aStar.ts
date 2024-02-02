import { grid } from '$lib/stores/grid';
import { getNodeNeibhours } from '../utils/grid';
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
	intercept
}: AlgorithmOptions) => {
	const q = minQueue();

	q.enqueue({
		node: startNode,
		weight: getHeuristic(startNode, endNode),
		prevNodeKey: null
	});

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
			q.enqueue({
				node: n,
				weight: getWeight(n) + getHeuristic(n, endNode),
				prevNodeKey: current.node.key
			});
		}
	}

	return;
};
