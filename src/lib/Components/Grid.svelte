<script>
	import Node from '$lib/Components/Node.svelte';
	import { history } from '$lib/stores/history';
	import Controls from './Controls.svelte';
	import { theme } from '$lib/stores/theme';
	import { layout } from '$lib/stores/layout';
	import { CELL_SIZE, GRID_GAP, toMapKey } from '$lib/stores/grid';
	import { tool } from '$lib/stores/tool';
	import { onMount } from 'svelte';
	import { queueAnimationByKey, removeFromAnimationQByKey } from '$lib/stores/animation';
	import {
		placeSelectedNode,
		selectedNode,
		startNodeKey,
		endNodeKey,
		startNode,
		endNode,
		isEqualNodes,
		walls
	} from '$lib/stores/nodes';

	const changeTheme = () => {
		if (theme.get() === 'dark') {
			theme.set('light');
		} else {
			theme.set('dark');
		}
	};

	onMount((el) => {
		const gridNode = document.getElementById('grid');

		const isStartOrEnd = (key) => $startNodeKey === key || $endNodeKey === key;

		const addWall = (key, isVisited) => {
			if (isStartOrEnd(key) || $walls.has(key)) {
			}
		};

		const animateWithSvelte = (node) => {
			queueAnimationByKey(node.id);

			node.addEventListener(
				'animationend',
				() => {
					console.log('---animation end');

					removeFromAnimationQByKey(node.id);
				},
				{ once: true }
			);

			node.addEventListener(
				'animationcancel',
				() => {
					console.log('---animation cancel');

					removeFromAnimationQByKey(node.id);
				},
				{ once: true }
			);
		};

		const handlePointerMove = (e) => {
			const node = document.elementFromPoint(e.clientX, e.clientY);

			if (!node.dataset.position) {
				return;
			}

			animateWithSvelte(node);
		};

		const handleToolMove = (e) => {
			const node = document.elementFromPoint(e.clientX, e.clientY);

			if (!node.dataset.position) {
				return;
			}

			animateWithSvelte(node);
		};

		const setupPointerTracking = () => {
			if ($tool) {
				gridNode.addEventListener('pointermove', handleToolMove);
			} else {
				gridNode.addEventListener('pointermove', handlePointerMove);
			}

			gridNode.addEventListener(
				'pointerup',
				() => {
					gridNode.removeEventListener('pointermove', handlePointerMove);
					gridNode.removeEventListener('pointermove', handleToolMove);
				},
				{ once: true }
			);
		};

		const handlePointerDown = (e) => {
			const node = e.target;
			const position = node.dataset.position;

			// Not hit a Node
			if (!position) {
				setupPointerTracking();
				return;
			}

			// RMB cancels selected Tool
			if (e.pointerType === 'mouse' && e.button === 2) {
				tool.set(null);
				selectedNode.set(null);
				return;
			}

			if ($tool) {
			}

			// Start/End Node already selected
			if ($selectedNode) {
				if ($selectedNode === $startNodeKey && position !== $endNodeKey) {
					startNodeKey.set(position);
					selectedNode.set(null);
				} else if ($selectedNode === $endNodeKey && position !== $startNodeKey) {
					endNodeKey.set(position);
					selectedNode.set(null);
				}
				animateWithSvelte(node);
				return;
			}

			if (position === $startNodeKey || position === $endNodeKey) {
				selectedNode.set(position);
			} else {
				animateWithSvelte(node);
				setupPointerTracking();
			}
		};

		gridNode.addEventListener('pointerdown', handlePointerDown);

		return () => {
			gridNode.removeEventListener('pointerdown', handlePointerDown);
		};
	});

	// <div class="navbar" on:click={changeTheme}>
	// 	<div><Icon name="sun" /></div>
	// 	<div class="rightNav">
	// 		<Icon name="faq" />
	// 		<Icon name="git" />
	// 	</div>
	// </div>
	// $: {
	// 	console.log('sss', $history);
	// }
</script>

<div
	class="wrapper"
	id="grid"
	style="--col:{$layout.screen.col};--row:{$layout.screen
		.row};--cell-size:{CELL_SIZE}px;--grid-gap:{GRID_GAP}px"
>
	{#each $history as { key, node } (key)}
		<Node {key} {node} />
	{/each}

	<Controls />
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

	/* .navbar {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		font-size: 2rem;
		display: flex;
		justify-content: space-between;
		padding: 8px;
		color: var(--color-nav-icon);
	} */

	@media (min-width: 1600px) {
		.wrapper {
			width: auto;
		}
	}
</style>
