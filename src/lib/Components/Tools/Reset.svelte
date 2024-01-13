<script>
	import { layout } from '$lib/stores/layout';
	import { resetState } from '$lib/stores/reset';
	import { tool } from '$lib/stores/tool';
	import Tool from './Tool.svelte';

	export let name;

	const resetMap = () => {
		resetState($layout.screen);
	};
</script>

<Tool {name}>
	<div class="wrapper" class:selected={$tool === name}>
		<div
			class="a"
			on:transitionstart={() => {
				resetMap();
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
		background-color: var(--bg-player);
	}

	.wrapper :nth-child(3) {
		background-color: var(--bg-weight);
	}

	.wrapper :nth-child(4) {
		background-color: var(--bg-wall);
	}

	.wrapper div {
		transform: scale(1);

		transition: all ease-in-out 0.3s;
		border: 1px solid var(--bg-body);

		height: 100%;
		width: 100%;
	}

	.wrapper.selected {
		opacity: 1;
		transform: scale(1.1);
		gap: 1px;
	}

	.wrapper.selected div {
		background-color: var(--bg-player);
		transition: all ease-in-out 0.4s;
	}

	.wrapper.selected :nth-child(3) {
		transition-delay: 0.1s;
	}

	.wrapper.selected :nth-child(4) {
		transition-delay: 0.2s;
	}
</style>
