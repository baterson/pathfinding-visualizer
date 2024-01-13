<script>
	import { onMount } from 'svelte';
	import Player from './Player.svelte';
	import Tools from './Tools.svelte';
	import { layout } from '$lib/stores/layout';
	import { execution } from '$lib/stores/execution';
	import { algorithmState, selectedAlgorithm } from '$lib/stores/algorithm';
	import { resetState } from '$lib/stores/reset';
	import { drawShortestPath, startNodeKey, endNodeKey } from '$lib/stores/nodes';
	import { grid } from '$lib/stores/grid';
	import { algorithms } from '$lib/algorithms';

	let innerHeight;
	let innerWidth;
	// let height;

	// onMount(() => {
	// 	height = calculateHeight();
	// });

	// const calculateHeight = () => {
	// 	let rows = 15;

	// 	if (innerWidth <= 600) {
	// 		if (innerHeight >= 800) {
	// 			rows = 21;
	// 		} else if (innerHeight >= 700) {
	// 			rows = 17;
	// 		} else {
	// 			rows = 15;
	// 		}
	// 	} else {
	// 		if (innerHeight >= 1600) {
	// 			rows = 23;
	// 		} else {
	// 			rows = 20;
	// 		}
	// 	}

	// 	return `${innerHeight - (rows * 30 + rows * 2)}px`;
	// };

	// $: {
	// 	let rows;

	// 	if (innerWidth <= 600) {
	// 		if (innerHeight >= 800) {
	// 			rows = 21;
	// 		} else if (innerHeight >= 700) {
	// 			rows = 17;
	// 		} else if (innerHeight >= 500) {
	// 			rows = 15;
	// 		} else {
	// 			rows = 12;
	// 		}
	// 	} else {
	// 		if (innerHeight >= 1600) {
	// 			rows = 23;
	// 		} else {
	// 			rows = 20;
	// 		}
	// 	}

	// 	height = `${innerHeight - (rows * 30 + rows * 2)}px`;
	// }
	// <button on:pointerdown={() => runSvelte.update((c) => !c)}>Svelte Animation: {$runSvelte}</button>

	const startAlgorithm = async () => {
		resetState($layout.screen);

		try {
			algorithmState.set('started');
			const al = algorithms[$selectedAlgorithm];
			console.log('al', al);

			await algorithms[$selectedAlgorithm]($grid.get($startNodeKey), $grid.get($endNodeKey));

			await drawShortestPath($grid.get($endNodeKey));

			algorithmState.set('finished');
		} catch (e) {
			resetState($layout.screen);
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
