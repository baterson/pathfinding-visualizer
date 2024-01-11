<script>
	import { tool } from '$lib/stores/tool';

	export let name;
</script>

<div class="wrapper" class:selected={$tool === name} on:pointerdown={() => tool.set(name)}>
	<slot />
	<div class="border" class:selected={$tool === name}></div>
</div>

<style>
	.wrapper {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.border {
		position: absolute;
		transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		background-color: var(--bg-body);
		opacity: 0.5;
		height: 3px;
		width: 10px;
		bottom: 0;
	}

	.border.selected {
		transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		opacity: 1;
		width: 130%;
	}
</style>
