<script>
	import { onMount } from 'svelte';

	import Controls from '$lib/Components/PlayerControls/Controls.svelte';
	import Tools from '$lib/Components/Tools.svelte';
	import { layout } from '$lib/stores/layout';
	import { wait, cancelablePromise } from '$lib/utils/promise';
	import { selectedAlgorithm } from '$lib/stores/algorithm';
	import { startNodeKey, endNodeKey, walls, weight, resetNodes } from '$lib/stores/nodes';
	import { grid, toMapKey } from '$lib/stores/grid';
	import { player, cancelFunction } from '$lib/stores/player';
	import { history, trackAtTheEnd } from '$lib/stores/history';
	import { algorithms } from '$lib/algorithms';

	const playAlgorithm = async () => {
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

			await intercept();

			return drawShortestPath(node.prevNode || null);
		};

		const startAlgorithm = async () => {
			const algorithm = algorithms[$selectedAlgorithm];

			grid.reset($layout.screen);

			try {
				player.updateState('play');

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
					intercept: intercept
				});

				await drawShortestPath($grid.get($endNodeKey));

				player.updateState('finished');
			} catch (e) {
				player.reset();
			}
		};

		if ($player.state === 'notStarted' || $player.state === 'finished') {
			await startAlgorithm();
		} else {
			player.play();
		}
	};

	const intercept = () => {
		const handlePlayer = (isCanceled) => {
			return new Promise((res, rej) => {
				const cb = async () => {
					if (isCanceled()) {
						return rej();
					}

					if ($player.state === 'pause') {
						await wait($player.speed, isCanceled);

						return requestAnimationFrame(cb);
					}

					if ($player.state === 'play') {
						if ($trackAtTheEnd) {
							return res();
						} else {
							await wait($player.speed, isCanceled);

							history.incrTrack();
							return requestAnimationFrame(cb);
						}
					}

					if ($player.state === 'forward') {
						if ($trackAtTheEnd) {
							player.updateState('pause');
							return res();
						} else {
							await wait($player.speed, isCanceled);

							history.incrTrack();
							return requestAnimationFrame(cb);
						}
					} else if ($player.state === 'backward') {
						player.updateState('pause');
						history.decrTrack();

						return requestAnimationFrame(cb);
					}

					throw new Error('Unexpected state in intercept');
				};

				return requestAnimationFrame(cb);
			});
		};

		const createIntercept = () => {
			const [cancel, Cancelable] = cancelablePromise();

			const executor = async (res, rej, isCanceled) => {
				if (isCanceled()) {
					return rej();
				}

				if (
					$player.state === 'forward' ||
					$player.state === 'backward' ||
					$player.state === 'pause'
				) {
					try {
						await handlePlayer(isCanceled);
						return res();
					} catch (e) {
						return rej();
					}
				} else {
					try {
						await wait($player.speed, isCanceled);
						return res();
					} catch (e) {
						return rej();
					}
				}
			};

			return [cancel, () => Cancelable(executor)];
		};

		const [cancel, Intercept] = createIntercept();
		cancelFunction.set(cancel);
		return Intercept();
	};

	onMount(() => {
		const handleKeyDown = (e) => {
			if (e.code === 'Escape') {
				selectedNode.set(null);
			}

			if (e.code === 'KeyC') {
				player.reset();
				return;
			}

			// reset Walls
			if (e.code === 'KeyX') {
				player.reset();
				resetNodes();

				return;
			}

			if (e.code === 'Space') {
				playAlgorithm();
				return;
			}

			if (e.code === 'ArrowDown') {
				player.incrSpeed();
				return;
			}

			if (e.code === 'ArrowUp') {
				player.decrSpeed();
				return;
			}

			if (e.code === 'ArrowLeft') {
				player.updateState('backward');
				return;
			}

			if (e.code === 'ArrowRight') {
				player.updateState('forward');
				return;
			}
		};

		const handleWheel = (e) => {
			if (e.deltaY < 0) {
				player.incrSpeed();
			} else if (e.deltaY > 0) {
				player.decrSpeed();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('wheel', handleWheel);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('wheel', handleWheel);
		};
	});
</script>

<div
	class="wrapper"
	style="--height:{$layout.player.height}px;--width:{$layout.player.width}px;"
	id="player"
>
	<Tools />
	<Controls {playAlgorithm} />
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
