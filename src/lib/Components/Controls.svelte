<script>
	import Player from './Player.svelte';
	import Tools from './Tools.svelte';
	import { layout } from '$lib/stores/layout';
	import { execution } from '$lib/stores/execution';
	import { algorithmState, selectedAlgorithm } from '$lib/stores/algorithm';
	import { resetExecution, resetState } from '$lib/stores/reset';
	import { startNodeKey, endNodeKey, walls, weight } from '$lib/stores/nodes';
	import { grid, toMapKey } from '$lib/stores/grid';
	import { algorithms } from '$lib/algorithms';

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
			await execution.intercept();
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
				}
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
			execution.play();
		}
	};
</script>

<div class="wrapper" style="--height:{$layout.playerHeight}px">
	<Tools />
	<Player handlePlay={playAlgorithm} />
</div>

<style>
	.wrapper {
		transition: background-color ease-in-out 0.5s;

		position: absolute;
		bottom: 0;
		height: var(--height);
		min-height: var(--height);
		width: 100%;
		background-color: var(--bg-player);
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 10px;
	}

	@media (min-width: 1024px) {
		.wrapper {
			left: 0;
			width: 576px;
			height: var(--height);
		}
	}
</style>
