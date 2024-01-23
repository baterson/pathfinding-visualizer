import { grid } from '$lib/stores/grid';
import type { AlgorithmOptions, Node } from '$lib/types';
import { getNextNeibhour } from '$lib/utils/grid';

export const startDfs = ({
	startNode,
	isWall,
	isEndNode,
	getNode,
	intercept
}: AlgorithmOptions) => {
	const dfs = async (node: Node | null): Promise<void> => {
		if (!node || isEndNode(node)) {
			return;
		}

		const nextNode = getNextNeibhour(node, getNode, isWall);

		if (nextNode) {
			grid.visitNode(nextNode, node.key);

			await intercept();

			return dfs(getNode(nextNode));
		} else {
			return dfs(node.prevNode);
		}
	};

	return dfs(startNode);
};
