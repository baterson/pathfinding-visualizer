<script>
	import { tool } from '$lib/stores/tool';
	import Tool from './Tool.svelte';

	export let name;
</script>

<Tool {name}>
	<div class="wrapper" class:selected={$tool === name}>W</div>
</Tool>

<style>
	.wrapper {
		transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		background-color: var(--bg-weight-tool);
		display: flex;
		color: var(--color-weight);
		align-items: flex-end;
		justify-content: flex-end;
		padding-right: 5px;
		padding-bottom: 2px;
		height: 30px;
		width: 30px;
		font-size: 0.8rem;
		font-weight: 700;

		transform: scale(1);
	}

	.wrapper.selected {
		transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		transform: scale(1.1);
	}
</style>
