import { writable } from 'svelte/store';
import { history, type HistoryItem } from '$lib/stores/history';
import type { Grid, Node, Position } from '$lib/types';

export const GRID_COLUMNS = 20;
export const GRID_GAP = 2;
export const CELL_SIZE = 30;

export const _createGrid = (rows: number, columns: number): Grid => {
	const grid: Grid = new Map();

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < columns; col++) {
			grid.set(`${row},${col}`, {
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

const createGridStore = () => {
	const { subscribe, update, set } = writable<Grid>(_createGrid(0, 0));

	subscribe((grid) => {
		if (grid) {
			const snapshot: HistoryItem = [...grid].map((el) => ({ key: el[0], node: el[1] }));

			history.update(snapshot);
		}
	});

	const visitNode = (node: Position, prevNode?: Node) => {
		return update((currentGrid) => {
			const key = toMapKey(node);
			const currentNode = currentGrid.get(key);
			if (currentNode) {
				currentGrid.set(key, {
					...currentNode,
					visited: true,
					prevNode: prevNode ? prevNode : null
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
		set(_createGrid(screen.row, screen.col));
	};

	return {
		subscribe,
		visitNode,
		setPath,
		reset
	};
};

export const grid = createGridStore();
