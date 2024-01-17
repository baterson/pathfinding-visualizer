import { writable } from 'svelte/store';
import type { AlgorithmName } from '$lib/algorithms';

export const selectedAlgorithm = writable<AlgorithmName>('bfs');
