<script lang="ts">
	import { selectedNodeKey } from '$lib/stores/nodes';
	import { tool, setTool } from '$lib/stores/tool';
	import type { Tool } from '$lib/types';

	export let name: Tool;
</script>

<div
	class="wrapper"
	class:selected={name === $tool}
	on:pointerdown={() => {
		selectedNodeKey.set(null);
		setTool(name);
	}}
>
	<slot />
	<div class="border" class:selected={name === $tool}></div>
</div>

<style>
	.wrapper {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		opacity: 0.7;
	}

	.border {
		position: absolute;
		transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		background-color: var(--bg-tool-border);
		height: 2px;
		width: 30%;
		bottom: 10px;
	}

	.border.selected {
		transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		width: 130%;
	}

	.wrapper.selected {
		opacity: 1;
	}

	@media (hover) {
		.wrapper:hover {
			opacity: 1;
		}
	}
</style>
