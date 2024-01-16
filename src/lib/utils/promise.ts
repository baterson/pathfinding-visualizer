export const wait = (tickToWait, isCanceled) => {
    return new Promise((res, rej) => {
        const cb = () => {
            if (isCanceled()) {
                return rej();
            }

            if (tickToWait === 0) {
                return res();
            } else {
                tickToWait -= 1;
                return requestAnimationFrame(cb);
            }
        };

        return requestAnimationFrame(cb);
    });
};

export const cancelablePromise = () => {
    let _canceled = false;
    const isCanceled = () => _canceled;
    const cancel = () => (_canceled = true);

    return [
        cancel,
        (cb) => {
            return new Promise((res, rej) => {
                return cb(res, rej, isCanceled);
            });
        }
    ];
};
