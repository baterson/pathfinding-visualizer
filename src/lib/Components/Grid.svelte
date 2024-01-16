<script>
	import Node from '$lib/Components/Node.svelte';
	import { gridSnapshot } from '$lib/stores/history';
	import Player from './Player.svelte';
	import { theme } from '$lib/stores/theme';
	import { layout } from '$lib/stores/layout';
	import { CELL_SIZE, GRID_GAP, grid } from '$lib/stores/grid';
	import { tool } from '$lib/stores/tool';
	import { onMount } from 'svelte';
	import { queueAnimationByKey, removeFromAnimationQByKey } from '$lib/stores/animation';
	import { selectedNodeKey, startNodeKey, endNodeKey, walls, weight } from '$lib/stores/nodes';
	import Icon from './Icon.svelte';
	import { player } from '$lib/stores/player';

	const changeTheme = () => {
		if ($theme === 'dark') {
			theme.set('light');
		} else {
			theme.set('dark');
		}
	};

	onMount(() => {
		const gridNode = document.getElementById('grid');

		const isStartOrEnd = (key) => $startNodeKey === key || $endNodeKey === key;
		const isWall = (key) => $walls.has(key);
		const isWeight = (key) => $weight.get(key);
		const isVisited = (key) => $grid.get(key).visited;

		const addWall = (key) => {
			if (isStartOrEnd(key) || isWall(key) || isVisited(key) || isWeight(key)) {
				return;
			}

			walls.addWall(key);
		};

		const addWeight = (key) => {
			if (isStartOrEnd(key) || isWall(key) || isVisited(key)) {
				return;
			}

			weight.addWeight(key);
		};

		const animateNode = (node) => {
			queueAnimationByKey(node.id);

			node.addEventListener('animationend', () => removeFromAnimationQByKey(node.id), {
				once: true
			});

			node.addEventListener('animationcancel', () => removeFromAnimationQByKey(node.id), {
				once: true
			});
		};

		const handleTool = (node) => {
			if ($tool === 'wall') {
				addWall(node.id);
			} else if ($tool === 'weight') {
				addWeight(node.id);
			}
		};

		const handleEraser = (node) => {
			if (isWall(node.id)) {
				walls.removeWall(node.id);
			} else if (isWeight(node.id)) {
				weight.removeWeight(node.id);
			}
		};

		const handleSelectedNode = (placePosition) => {
			if (isWall(placePosition) || isWeight(placePosition)) {
				return;
			}

			if ($selectedNodeKey === $startNodeKey && placePosition !== $endNodeKey) {
				startNodeKey.set(placePosition);
				selectedNodeKey.set(null);
			} else if ($selectedNodeKey === $endNodeKey && placePosition !== $startNodeKey) {
				endNodeKey.set(placePosition);
				selectedNodeKey.set(null);
			}
		};

		const handlePointerMove = (e) => {
			const node = document.elementFromPoint(e.clientX, e.clientY);

			if (!node.dataset.position) {
				return;
			}

			if ($tool) {
				handleTool(node);
			} else {
				handleEraser(node);
			}

			animateNode(node);
		};

		const setupPointerTracking = () => {
			gridNode.addEventListener('pointermove', handlePointerMove);

			gridNode.addEventListener(
				'pointerup',
				() => {
					gridNode.removeEventListener('pointermove', handlePointerMove);
				},
				{ once: true }
			);
		};

		const handlePointerDown = (e) => {
			const node = e.target;
			const position = node.dataset.position;

			// RMB cancels selected Tool
			if (e.pointerType === 'mouse' && e.button === 2) {
				tool.set(null);
				selectedNodeKey.set(null);
				return;
			}

			// Not hit a Node
			if (!position) {
				animateNode(node);
				setupPointerTracking();
				return;
			}

			// Start/End Node already selected
			if ($selectedNodeKey) {
				handleSelectedNode(position);
				animateNode(node);
				return;
			}

			// Start/End node just selected
			if (position === $startNodeKey || position === $endNodeKey) {
				selectedNodeKey.set(position);

				tool.set(null);
				grid.reset($layout.screen);
				player.reset();
				return;
			}

			// Tool selected
			if ($tool) {
				handleTool(node);
				animateNode(node);
				setupPointerTracking();
				return;
			}

			// Hit empty node
			handleEraser(node);
			animateNode(node);
			setupPointerTracking();
		};

		const noop = (e) => {
			e.preventDefault();
		};

		gridNode.addEventListener('pointerdown', handlePointerDown);
		window.addEventListener('contextmenu', noop);

		return () => {
			gridNode.removeEventListener('pointerdown', handlePointerDown);
			window.removeEventListener('contextmenu', noop);
		};
	});
</script>

<div
	class="wrapper"
	id="grid"
	style="--col:{$layout.screen.col};--row:{$layout.screen
		.row};--cell-size:{CELL_SIZE}px;--grid-gap:{GRID_GAP}px"
>
	<div class="navbar" on:pointerdown|stopPropagation={changeTheme}>
		<div><Icon name="sun" /></div>
	</div>

	{#each $gridSnapshot as { key, node } (key)}
		<Node {key} {node} />
	{/each}

	<Player />
</div>

<style>
	.wrapper {
		position: relative;
		height: 100%;
		padding-top: 1px;
		gap: var(--grid-gap);
		display: grid;
		grid-template-columns: repeat(var(--col), var(--cell-size));
		grid-template-rows: repeat(var(--row), var(--cell-size));
	}

	.navbar {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		font-size: 2rem;
		display: flex;
		justify-content: space-between;
		color: var(--color-nav-icon);
	}

	@media (min-width: 1600px) {
		.wrapper {
			width: auto;
		}
	}
</style>
