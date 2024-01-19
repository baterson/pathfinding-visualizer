import { writable } from 'svelte/store';

// Selected Nodes for animation
export const animationQ = writable(new Set<string>());

export const queueAnimationByKey = (key: string) =>
    animationQ.update((current) => {
        current.add(key);
        return current;
    });

export const removeFromAnimationQByKey = (key: string) =>
    animationQ.update((current) => {
        current.delete(key);
        return current;
    });
