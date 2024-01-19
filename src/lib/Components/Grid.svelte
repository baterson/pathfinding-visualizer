<script lang="ts">
	import Node from '$lib/Components/Node.svelte';
	import { gridSnapshot } from '$lib/stores/history';
	import { layout } from '$lib/stores/layout';
	import { CELL_SIZE, GRID_GAP, grid } from '$lib/stores/grid';
	import { tool } from '$lib/stores/tool';
	import { onMount } from 'svelte';
	import { queueAnimationByKey, removeFromAnimationQByKey } from '$lib/stores/animation';
	import { selectedNodeKey, startNodeKey, endNodeKey, walls, weight } from '$lib/stores/nodes';
	import { player } from '$lib/stores/player';

	onMount(() => {
		const gridNode = document.getElementById('grid') as HTMLElement;

		const isStartOrEnd = (key: string) => $startNodeKey === key || $endNodeKey === key;
		const isWall = (key: string) => $walls.has(key);
		const isWeight = (key: string) => $weight.get(key);
		const isVisited = (key: string) => {
			const node = $grid.get(key)!;
			return node.visited;
		};

		const addWall = (key: string) => {
			if (isStartOrEnd(key) || isWall(key) || isVisited(key) || isWeight(key)) {
				return;
			}

			walls.addWall(key);
		};

		const addWeight = (key: string) => {
			if (isStartOrEnd(key) || isWall(key) || isVisited(key)) {
				return;
			}

			weight.addWeight(key);
		};

		const animateNode = (node: HTMLElement) => {
			queueAnimationByKey(node.id);

			node.addEventListener('animationend', () => removeFromAnimationQByKey(node.id), {
				once: true
			});

			node.addEventListener('animationcancel', () => removeFromAnimationQByKey(node.id), {
				once: true
			});
		};

		const handleTool = (node: HTMLElement) => {
			if ($tool === 'wall') {
				addWall(node.id);
			} else if ($tool === 'weight') {
				addWeight(node.id);
			}
		};

		const handleEraser = (node: HTMLElement) => {
			if (isWall(node.id)) {
				walls.removeWall(node.id);
			} else if (isWeight(node.id)) {
				weight.removeWeight(node.id);
			}
		};

		const handleSelectedNode = (key: string) => {
			if (isWall(key) || isWeight(key)) {
				return;
			}

			if ($selectedNodeKey === $startNodeKey && key !== $endNodeKey) {
				startNodeKey.set(key);
				selectedNodeKey.set(null);
			} else if ($selectedNodeKey === $endNodeKey && key !== $startNodeKey) {
				endNodeKey.set(key);
				selectedNodeKey.set(null);
			}
		};

		const handlePointerMove = (e: PointerEvent) => {
			const node = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;

			if (!node || node.dataset.type !== 'node') {
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

		const handlePointerDown = (e: PointerEvent) => {
			const node = e.target as HTMLElement;
			const key = node.id as string;

			// RMB cancels selected Tool
			if (e.pointerType === 'mouse' && e.button === 2) {
				tool.set(null);
				selectedNodeKey.set(null);
				return;
			}

			// Not hit a Node
			if (!node.dataset || node.dataset.type !== 'node') {
				animateNode(node);
				setupPointerTracking();
				return;
			}

			// Start/End Node already selected
			if ($selectedNodeKey) {
				handleSelectedNode(key);
				animateNode(node);
				return;
			}

			// Start/End node just selected
			if (key === $startNodeKey || key === $endNodeKey) {
				selectedNodeKey.set(key);

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

		const preventDefault = (e: Event) => {
			e.preventDefault();
		};

		gridNode.addEventListener('pointerdown', handlePointerDown);
		window.addEventListener('contextmenu', preventDefault);

		return () => {
			gridNode.removeEventListener('pointerdown', handlePointerDown);
			window.removeEventListener('contextmenu', preventDefault);
		};
	});
</script>

<div
	class="wrapper"
	id="grid"
	style="--col:{$layout.screen.col};--row:{$layout.screen
		.row};--cell-size:{CELL_SIZE}px;--grid-gap:{GRID_GAP}px"
>
	{#each $gridSnapshot as { key, node } (key)}
		<Node {key} {node} />
	{/each}
</div>

<style>
	.wrapper {
		position: relative;
		padding-top: 1px;
		gap: var(--grid-gap);
		display: grid;
		grid-template-columns: repeat(var(--col), var(--cell-size));
		grid-template-rows: repeat(var(--row), var(--cell-size));
	}
</style>
