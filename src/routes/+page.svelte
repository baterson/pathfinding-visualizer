<script>
	import Grid from '$lib/Components/Grid.svelte';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import { layout } from '$lib/stores/layout';
	import { fade } from 'svelte/transition';
	import { grid } from '$lib/stores/grid';

	onMount(() => {
		const uns = layout.subscribe(({ screen }) => {
			grid.reset(screen);
		});

		requestAnimationFrame(() => {
			layout.setLayout();
		});

		const unsub = theme.subscribe((theme) => {
			if (theme === 'light') {
				document.body.classList.remove('dark');
				document.body.classList.add('light');
			} else {
				document.body.classList.remove('light');
				document.body.classList.add('dark');
			}
		});

		const handleResize = () => {
			layout.setLayout();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			unsub();
			uns();
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div class="wrapper">
	{#if $layout.isCalculating}
		<div class="preload" out:fade={{ duration: 300, delay: 100 }}></div>
	{:else}
		<Grid />
	{/if}
</div>

<style>
	.preload {
		z-index: 2;
		background: var(--bg-body);
		position: absolute;
		height: 100svh;
		width: 100%;
		left: 0;
	}
	.wrapper {
		background: var(--bg-body);
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
</style>
