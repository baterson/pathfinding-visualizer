<script lang="ts">
	import { player } from '$lib/stores/player';
	import { resetNodes } from '$lib/stores/nodes';
	import { tool } from '$lib/stores/tool';
	import Tool from './Tool.svelte';
	import type { Tool as ToolType } from '$lib/types';

	export let name: ToolType;

	const resetMap = () => {
		player.reset();
		resetNodes();
	};
</script>

<Tool {name}>
	<div class="wrapper" class:selected={$tool === name}>
		<div
			class="a"
			on:transitionstart={() => {
				if ($tool === 'reset') {
					resetMap();
				}
			}}
		></div>
		<div class="b"></div>
		<div class="c"></div>
		<div
			class="d"
			on:transitionend={(e) => {
				if ($tool === 'reset') {
					tool.set(null);
				}
			}}
		></div>
	</div>
</Tool>

<style>
	.wrapper {
		transition: all ease-in-out 0.3s;
		height: 30px;
		width: 30px;
		background-color: var(--player-color);
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
	}

	.wrapper :nth-child(1) {
		background-color: var(--bg-wall);
	}

	.wrapper :nth-child(2) {
		border-left: none;
		background-color: var(--bg-player);
	}

	.wrapper :nth-child(3) {
		border-top: none;
		background-color: var(--bg-weight-tool);
	}

	.wrapper :nth-child(4) {
		border-top: none;
		border-left: none;
		background-color: var(--bg-wall);
	}

	.wrapper div {
		border: 1px solid var(--bg-body);
		transform: scale(1);
		transition: all ease-in-out 0.3s;

		height: 100%;
		width: 100%;
	}

	.wrapper.selected {
		opacity: 1;
		transform: scale(1.1);
		gap: 1px;
	}

	.wrapper.selected div {
		border: 1px solid var(--bg-body);
		background-color: var(--bg-player);
		transition: background-color ease-in-out 0.4s;
	}

	.wrapper.selected :nth-child(3) {
		transition-delay: 0.1s;
	}

	.wrapper.selected :nth-child(4) {
		transition-delay: 0.2s;
	}
</style>
