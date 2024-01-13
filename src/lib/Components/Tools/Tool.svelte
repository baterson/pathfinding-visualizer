<script>
	import { selectedNode } from '$lib/stores/nodes';
	import { setTool, tool } from '$lib/stores/tool';

	export let name;
</script>

<div
	class="wrapper"
	class:selected={name === $tool}
	on:pointerdown={() => {
		selectedNode.set(null);
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
		opacity: 0.5;
	}

	.border {
		position: absolute;
		transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		background-color: var(--bg-body);
		height: 3px;
		width: 10px;
		bottom: 0;
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
