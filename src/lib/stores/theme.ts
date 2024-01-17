import { writable } from 'svelte/store';
import type { Theme } from '$lib/types';

export const theme = writable<Theme>('light');
