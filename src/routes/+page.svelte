<script lang="ts">
	import Grid from '$lib/Components/Grid.svelte';
	import type { Screen } from '$lib/types';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import { layout } from '$lib/stores/layout';
	import { fade } from 'svelte/transition';
	import { grid, toMapKey } from '$lib/stores/grid';
	import Nav from '$lib/Components/Nav.svelte';
	import Player from '$lib/Components/Player.svelte';
	import HelpModal from '$lib/Components/HelpModal.svelte';
	import { player } from '$lib/stores/player';
	import { endNodeKey, resetNodes, startNodeKey, walls } from '$lib/stores/nodes';

	let isHelpOpen = true;

	const toggleHelpModal = () => {
		isHelpOpen = !isHelpOpen;
	};

	const setInitialPlacement = (screen: Screen) => {
		const endPosition = { row: Math.min(15, screen.row - 3), col: Math.min(25, screen.col - 3) };
		const wallsPositions = [
			{ row: 1, col: 7 },
			{ row: 1, col: 6 },
			{ row: 1, col: 5 },
			{ row: 2, col: 5 },
			{ row: 3, col: 5 },
			{ row: 4, col: 5 },
			{ row: 5, col: 5 },
			{ row: 6, col: 5 },

			{ row: endPosition.row - 2, col: endPosition.col - 3 },
			{ row: endPosition.row - 1, col: endPosition.col - 3 },
			{ row: endPosition.row, col: endPosition.col - 3 },
			{ row: endPosition.row, col: endPosition.col - 4 },
			{ row: endPosition.row, col: endPosition.col - 5 },
			{ row: endPosition.row, col: endPosition.col - 6 },
			{ row: endPosition.row, col: endPosition.col - 7 },
			{ row: endPosition.row, col: endPosition.col - 8 }
		];

		player.reset();
		grid.reset(screen);

		wallsPositions.forEach((element) => {
			walls.addWall(toMapKey(element));
		});
		startNodeKey.set(toMapKey({ row: 2, col: 2 }));
		endNodeKey.set(toMapKey(endPosition));
	};

	onMount(() => {
		const layoutSub = layout.subscribe(({ screen }) => {
			if (screen.col > 0 && screen.row > 0) {
				setInitialPlacement(screen);
			}
		});

		layout.setLayout();

		const handleResize = () => {
			resetNodes();
			layout.setCalculating();
			layout.setLayout();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			layoutSub();
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div class="wrapper">
	{#if $layout.isCalculating}
		<div class="preload" out:fade={{ duration: 200 }}></div>
	{/if}

	{#if isHelpOpen}
		<HelpModal toggleModal={toggleHelpModal} />
	{/if}
	<Nav {toggleHelpModal} />
	<Grid />
	<Player />
</div>

<style>
	.preload {
		z-index: 2;
		background: hsla(270, 32%, 9%, 1);
		position: absolute;
		height: 100%;
		width: 100%;
	}

	.wrapper {
		background: var(--bg-body);
		width: 100%;
		height: 100svh;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		position: relative;
	}
</style>
