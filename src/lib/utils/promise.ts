export const wait = (tickToWait: number, isCanceled: () => boolean) => {
	return new Promise<void>((res, rej) => {
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

export type Callback = (res: () => void, rej: () => void, isCanceled: () => boolean) => void;

export const cancelablePromise = (): [() => void, (cb: Callback) => Promise<void>] => {
	let _canceled = false;
	const isCanceled = () => _canceled;
	const cancel = () => (_canceled = true);

	return [
		cancel,
		(cb: Callback) => {
			return new Promise<void>((res, rej) => {
				return cb(res, rej, isCanceled);
			});
		}
	];
};
