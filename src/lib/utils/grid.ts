import type { Node, AlgorithmOptions, Screen } from '$lib/types';

export const getNodeNeibhours = (
	node: Node,
	screen: Screen,
	getNode: AlgorithmOptions['getNode']
): Node[] => {
	const { row, col } = node;

	let left, top, right, bottom;

	if (row === screen.row - 1 && col === screen.col) {
		return [];
	}

	if (col !== 0) {
		left = getNode({ row, col: col - 1 });
	}

	if (row !== 0) {
		top = getNode({ row: row - 1, col });
	}

	if (col + 1 < screen.col) {
		right = getNode({ row, col: col + 1 });
	}

	if (row + 1 < screen.row) {
		bottom = getNode({ row: row + 1, col });
	}

	return [left, top, right, bottom].filter((el) => el !== undefined) as Node[];
};

export const getNextNeibhour = (
	node: Node,
	getNode: AlgorithmOptions['getNode'],
	isWall: (node: Node) => boolean
) => {
	const checkNode = (node: Node) => {
		if (!node || isWall(node) || node.visited) {
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

	return getTopNode(node) || getRightNode(node) || getBottomNode(node) || getLeftNode(node);
};
