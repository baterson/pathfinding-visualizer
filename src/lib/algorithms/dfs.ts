import { grid } from '$lib/stores/grid';
import type { AlgorithmOptions, Node } from '$lib/types';

export const startDfs = ({
	startNode,
	isWall,
	isEndNode,
	getNode,
	hitBoundary,
	intercept
}: AlgorithmOptions) => {
	const checkNode = (node: Node) => {
		if (!node || isWall(node) || node.visited || hitBoundary(node)) {
			return null;
		}
		return node;
	};

	const getTopNode = (node: Node) => {
		const { row, col } = node;
		const nextNode = getNode({ row: row - 1, col });

		return checkNode(nextNode);
	};

	const getRightNode = (node: Node) => {
		const { row, col } = node;
		const nextNode = getNode({ row: row, col: col + 1 });

		return checkNode(nextNode);
	};

	const getBottomNode = (node: Node) => {
		const { row, col } = node;
		const nextNode = getNode({ row: row + 1, col: col });

		return checkNode(nextNode);
	};

	const getLeftNode = (node: Node) => {
		const { row, col } = node;
		const nextNode = getNode({ row: row, col: col - 1 });

		return checkNode(nextNode);
	};

	const getNextNode = (node: Node) => {
		const nextNode =
			getTopNode(node) || getRightNode(node) || getBottomNode(node) || getLeftNode(node);
		return nextNode;
	};

	const dfs = async (node: Node | null): Promise<void> => {
		if (!node || isEndNode(node)) {
			return;
		}

		const nextNode = getNextNode(node);

		grid.visitNode(node);

		if (nextNode) {
			await intercept();

			grid.visitNode(nextNode, node);
			const nodeUpdated = getNode(nextNode);

			return dfs(nodeUpdated);
		} else {
			return dfs(node.prevNode ? getNode(node.prevNode) : null);
		}
	};

	return dfs(startNode);
};
