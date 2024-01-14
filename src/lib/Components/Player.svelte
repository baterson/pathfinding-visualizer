<script>
	import { beforeUpdate, afterUpdate } from 'svelte';

	import Controls from '$lib/Components/PlayerControls/Controls.svelte';
	import Tools from '$lib/Components/Tools.svelte';
	import { layout } from '$lib/stores/layout';
	import { algorithmState, selectedAlgorithm } from '$lib/stores/algorithm';
	import { resetExecution, resetState } from '$lib/stores/reset';
	import { startNodeKey, endNodeKey, walls, weight } from '$lib/stores/nodes';
	import { grid, toMapKey } from '$lib/stores/grid';
	import { player, lastCancel } from '$lib/stores/player';
	import { history, historyTrack } from '$lib/stores/history';
	import { algorithms } from '$lib/algorithms';

	const isTrackAtTheEnd = () => {
		console.log('$historyTrack', $historyTrack);
		console.log('history.length', $history.length);
		return $historyTrack === $history.length - 1;
		// return $historyTrack === $history.length;
	};

	const drawShortestPath = async (node) => {
		const key = toMapKey(node);

		if (!node) {
			return;
		}

		if ($startNodeKey === key) {
			return;
		}

		// // Don't update path for start or end Node
		if (key !== $endNodeKey) {
			grid.updateNode(node, { path: true });
		}

		try {
			await createIntercept();
		} catch (e) {
			return;
		}

		return drawShortestPath(node.prevNode || null);
	};

	const startAlgorithm = async () => {
		const algorithm = algorithms[$selectedAlgorithm];

		resetExecution($layout.screen);

		try {
			algorithmState.set('started');

			await algorithm({
				startNode: $grid.get($startNodeKey),
				endNode: $grid.get($endNodeKey),
				isEndNode: (node) => toMapKey(node) === $endNodeKey,
				isWall: (node) => $walls.has(toMapKey(node)),
				getNode: (node) => $grid.get(toMapKey(node)),
				screen: $layout.screen,
				getWeight: (node) => {
					return $weight.get(toMapKey(node)) || 0;
				},
				hitPlayerBoundary: (node) => {
					// 21 18
					// console.log('$layout.player', $layout.player);
					if (node.row > $layout.player.row && node.col <= $layout.player.col) {
						console.log('Hit...', node.row, node.col);
						// console.log($layout.player);
						return true;
					}
				},
				intercept: createIntercept
			});

			await drawShortestPath($grid.get($endNodeKey));

			algorithmState.set('finished');
		} catch (e) {
			resetExecution($layout.screen);
		}
	};

	const playAlgorithm = async () => {
		if ($algorithmState === 'notStarted' || $algorithmState === 'finished') {
			try {
				await startAlgorithm();
			} catch (e) {
				console.log('Execution canceled');
			}
		} else {
			player.play();
		}
	};

	const wait = (isCanceled) => {
		let tickToWait = Number($player.speed);

		return new Promise((res, rej) => {
			const cb = () => {
				if (isCanceled()) {
					return rej();
				}

				console.log('tickToWait', tickToWait);
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

	// const pause = async (isCanceled) => {
	//     return new Promise((res, rej) => {
	//         const cb = () => {

	//             if (isCanceled()) {
	//                 return rej()
	//             }

	//             const storeState = get(store)
	//             const { decrTrack, incrTrack, isTrackAtTheEnd } = history

	//             if (!storeState.isPaused) {
	//                 return res()
	//             }

	//             if (storeState.inForward) {
	//                 if (isTrackAtTheEnd()) {
	//                     setInForward(false)
	//                     // Tracking ended continue execution
	//                     return res()
	//                 } else {
	//                     incrTrack()
	//                     setInForward(false)
	//                     return requestAnimationFrame(cb)
	//                 }

	//             } else if (storeState.inBackward) {
	//                 setInBackward(false)
	//                 decrTrack()
	//                 return requestAnimationFrame(cb)
	//             } else {
	//                 return requestAnimationFrame(cb)
	//             }
	//         }
	//         return requestAnimationFrame(cb)
	//     })
	// }

	// const restoreHistory = (isCanceled) => {
	//     return new Promise((res, rej) => {
	//         const cb = async () => {
	//             if (isCanceled()) {
	//                 return rej()
	//             }

	//             const { incrTrack, isTrackAtTheEnd } = history

	//             if (store.isPaused) {
	//                 return res()
	//             }

	//             if (isTrackAtTheEnd()) {
	//                 return res()
	//             } else {
	//                 await wait(isCanceled)

	//                 if (isCanceled()) {
	//                     return rej()
	//                 }

	//                 incrTrack()
	//                 return requestAnimationFrame(cb)
	//             }
	//         }

	//         return requestAnimationFrame(cb)
	//     })
	// }

	const cancelablePromise = () => {
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

	const intercept = () => {
		const [cancel, Cancelable] = cancelablePromise();

		const executor = async (res, rej, isCanceled) => {
			if (isCanceled()) {
				rej();
			}

			if ($player.state === 'pause') {
				try {
					// await pause(isCanceled);
				} catch (e) {
					return rej();
				}

				return res();
				// } else if (!isTrackAtTheEnd()) {
				// 	// console.log($historyTrack, $history.length);
				// 	// await restoreHistory(isCanceled);
				// 	return res();
			} else {
				try {
					await wait(isCanceled);
					return res();
				} catch (e) {
					return rej();
				}
			}
		};

		// TODO: check return with request anim
		return [cancel, () => Cancelable(executor)];
	};

	const createIntercept = () => {
		const [cancel, Intercept] = intercept();
		lastCancel.set(cancel);
		return Intercept();
	};
</script>

<div
	class="wrapper"
	style="--height:{$layout.player.height}px;--width:{$layout.player.width}px;"
	id="player"
>
	<Tools />
	<Controls handlePlay={playAlgorithm} />
</div>

<style>
	.wrapper {
		transition: background-color ease-in-out 0.5s;

		position: absolute;
		left: 0;
		bottom: 0;
		height: var(--height);
		min-height: var(--height);
		width: var(--width);
		background-color: var(--bg-player);
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 10px;
	}

	/* @media (min-width: 1024px) {
		.wrapper {
			left: 0;
			width: 576px;
			height: var(--height);
		}
	} */
</style>
