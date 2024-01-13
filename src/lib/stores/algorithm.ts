import { writable } from 'svelte/store';


export const algorithmState = writable('notStarted')
export const selectedAlgorithm = writable('dfs')
