<script>
	import { tool } from '$lib/stores/tool';
	import Border from './Border.svelte';

	export let name;
</script>

<Border {name}>
	<div class="wrapper" class:selected={$tool === name}></div>
</Border>

<style>
	.wrapper {
		transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		height: 30px;
		width: 30px;
		transform: scale(1);

		opacity: 0.5;

		background-color: var(--bg-wall);
	}

	.wrapper.selected {
		opacity: 1;
		transform: scale(1.1);
	}
</style>
