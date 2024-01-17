import type { Node } from '$lib/types';

type WeightedNode = { weight: number; node: Node };

interface Q<T> {
	isEmpty: () => boolean;
	enqueue: (el: T) => void;
	dequeue: () => T | undefined;
}

export const queue = (): Q<Node> => {
	let q: Node[] = [];

	return {
		isEmpty: () => !q.length,
		enqueue: (el) => q.push(el),
		dequeue: () => {
			const el = q[0];
			q = q.slice(1);
			return el;
		}
	};
};

export const minQueue = (): Q<WeightedNode> => {
	let q: WeightedNode[] = [];

	return {
		isEmpty: () => !q.length,
		enqueue: (el) => {
			q.push(el);
			q.sort((a, b) => a.weight - b.weight);
		},
		dequeue: () => {
			const el = q[0];
			q = q.slice(1);
			return el;
		}
	};
};
