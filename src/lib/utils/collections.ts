import type { Node } from '$lib/types';

type QNode = { node: Node, prevNodeKey: string | null }
type QWeightedNode = { weight: number; node: Node, prevNodeKey: string | null };

interface Q<T> {
    isEmpty: () => boolean;
    has: (key: string) => boolean;
    enqueue: (el: T) => void;
    dequeue: () => T | undefined;
}

export const queue = (): Q<QNode> => {
    let q: QNode[] = [];

    return {
        isEmpty: () => !q.length,
        has: key => !!q.find(item => item.node.key === key),
        enqueue: (el) => q.push(el),
        dequeue: () => {
            const el = q[0];
            q = q.slice(1);
            return el;
        }
    };
};

export const minQueue = (): Q<QWeightedNode> => {
    let q: QWeightedNode[] = [];

    return {
        has: key => !!q.find(item => item.node.key === key),
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
