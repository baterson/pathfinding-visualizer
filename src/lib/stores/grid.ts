import { writable } from 'svelte/store';
import { history, type HistoryItem } from '$lib/stores/history';
import type { Grid, Node, Position } from '$lib/types';

export const GRID_GAP = 2;
export const CELL_SIZE = 30;

export const createGridMap = (rows: number, columns: number): Grid => {
	const grid: Grid = new Map();

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < columns; col++) {
			const key = toMapKey({ row, col });
			grid.set(key, {
				key,
				row,
				col,
				visited: false,
				prevNode: null,
				path: false,
				x: CELL_SIZE * col + GRID_GAP * col,
				y: CELL_SIZE * row + GRID_GAP * row
			});
		}
	}

	return grid;
};

export const toMapKey = (position: Position): string => {
	return `${position.row},${position.col}`;
};

// Grid items, amount of items calculates from the Layout store
const createGridStore = () => {
	const { subscribe, update, set } = writable<Grid>(createGridMap(0, 0));

	subscribe((grid) => {
		if (grid) {
			const snapshot: HistoryItem = [...grid].map((el) => ({ key: el[0], node: el[1] }));

			history.update(snapshot);
		}
	});

	const visitNode = (node: Position, prevNodeKey: string | null) => {
		return update((currentGrid) => {
			const key = toMapKey(node);
			const currentNode = currentGrid.get(key);
			const prevNode = prevNodeKey ? currentGrid.get(prevNodeKey)! : null;

			if (currentNode) {
				currentGrid.set(key, {
					...currentNode,
					prevNode,
					visited: true
				});
			}

			return currentGrid;
		});
	};

	const _visitNode = (node: Position) => {
		return update((currentGrid) => {
			const key = toMapKey(node);
			const currentNode = currentGrid.get(key);
			if (currentNode) {
				currentGrid.set(key, {
					...currentNode,
					visited: true
				});
			}

			return currentGrid;
		});
	};

	const setPath = (node: Position) => {
		return update((currentGrid) => {
			const key = toMapKey(node);
			const currentNode = currentGrid.get(key);

			if (currentNode) {
				currentGrid.set(key, { ...currentNode, path: true });
			}

			return currentGrid;
		});
	};

	const reset = (screen: { row: number; col: number }) => {
		history.reset();
		set(createGridMap(screen.row, screen.col));
	};

	return {
		subscribe,
		visitNode,
		_visitNode,
		setPath,
		reset
	};
};

export const grid = createGridStore();
