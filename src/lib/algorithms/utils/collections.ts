export const queue = () => {
    let q = [];

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

export const minQueue = () => {
    let q = [];

    return {
        isEmpty: () => !q.length,
        enqueue: (el) => {
            q.push(el)
            q.sort((a, b) => a.weight - b.weight)
        },
        dequeue: () => {
            const el = q[0];
            q = q.slice(1);
            return el;
        }
    };
};
