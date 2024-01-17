<script lang="ts">
	import { tool } from '$lib/stores/tool';
	import Tool from './Tool.svelte';
	import type { Tool as ToolType } from '$lib/types';

	export let name: ToolType;
</script>

<Tool {name}>
	<div class="wrapper" class:selected={$tool === name}></div>
</Tool>

<style>
	.wrapper {
		transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		height: 30px;
		width: 30px;
		transform: scale(1);
		background-color: var(--bg-wall-tool);
	}

	.wrapper.selected {
		transform: scale(1.1);
	}
</style>
