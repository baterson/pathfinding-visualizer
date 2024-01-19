import { writable } from 'svelte/store';
import type { Theme } from '$lib/types';

// Site theme
export const theme = writable<Theme>('dark');
