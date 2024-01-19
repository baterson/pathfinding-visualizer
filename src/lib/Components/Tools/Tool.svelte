<script lang="ts">
	import { selectedNodeKey } from '$lib/stores/nodes';
	import { tool, setTool } from '$lib/stores/tool';
	import type { Tool } from '$lib/types';
	import Border from '../Border.svelte';

	export let name: Tool;
</script>

<Border selected={name === $tool}>
	<div
		class="wrapper"
		class:selected={name === $tool}
		on:pointerdown={() => {
			selectedNodeKey.set(null);
			setTool(name);
		}}
	>
		<slot />
	</div>
</Border>

<style>
	.wrapper {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		opacity: 0.7;
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
