<script>
	import { tool } from '$lib/stores/tool';
	import Border from './Border.svelte';

	export let name;
</script>

<Border {name}>
	<div class="wrapper" class:selected={$tool === name}>W</div>
</Border>

<style>
	.wrapper {
		transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		background-color: var(--bg-weight);
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

		opacity: 0.5;

		transform: scale(1);
	}

	.wrapper.selected {
		transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

		opacity: 1;
		transform: scale(1.1);
	}
</style>
