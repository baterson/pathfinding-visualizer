import { bfs } from './bfs';
import { startDfs } from './dfs';
import { dijkstra } from './dijkstra';
import { aStar } from './aStar';
import type { AlgorithmOptions } from '$lib/types';

export type AlgorithmName = 'aStar' | 'dijkstra' | 'bfs' | 'dfs';
export type AlgorithmFunction = (options: AlgorithmOptions) => Promise<void>;
export type AlgorithmMap = Record<AlgorithmName, AlgorithmFunction>;

export const algorithms: AlgorithmMap = {
	aStar: aStar,
	dijkstra: dijkstra,
	bfs: bfs,
	dfs: startDfs
};

export const displayNames: Record<AlgorithmName, string> = {
	aStar: 'A-star',
	dijkstra: 'Dijkstra',
	bfs: 'BFS',
	dfs: 'DFS'
};
