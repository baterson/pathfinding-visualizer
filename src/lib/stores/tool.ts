import { writable } from 'svelte/store';
import type { Tool } from '$lib/types';

export const tool = writable<Tool>(null);

export const setTool = (name: Tool) => {
	tool.update((current) => {
		if (name === current) {
			return null;
		}
		return name;
	});
};
