<script lang="ts">
	import Grid from '$lib/Components/Grid.svelte';
	import { theme } from '$lib/stores/theme';
	import { onMount, tick } from 'svelte';
	import { layout } from '$lib/stores/layout';
	import { fade } from 'svelte/transition';
	import { grid } from '$lib/stores/grid';
	import Nav from '$lib/Components/Nav.svelte';
	import Player from '$lib/Components/Player.svelte';
	import HelpModal from '$lib/Components/HelpModal.svelte';
	import { player } from '$lib/stores/player';
	import { resetNodes } from '$lib/stores/nodes';

	let isHelpOpen = true;

	const toggleHelpModal = () => {
		isHelpOpen = !isHelpOpen;
	};

	onMount(() => {
		const layoutSub = layout.subscribe(({ screen }) => {
			player.reset();
			grid.reset(screen);
		});

		layout.setLayout();

		const themeSub = theme.subscribe((theme) => {
			if (theme === 'light') {
				document.body.classList.remove('dark');
				document.body.classList.add('light');
			} else {
				document.body.classList.remove('light');
				document.body.classList.add('dark');
			}
		});

		const handleResize = () => {
			layout.setCalculating();
			layout.setLayout();
			player.reset();
			resetNodes();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			themeSub();
			layoutSub();
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div class="wrapper">
	{#if $layout.isCalculating}
		<div class="preload" out:fade={{ duration: 200 }}></div>
	{/if}

	{#if isHelpOpen}
		<HelpModal toggleModal={toggleHelpModal} />
	{/if}
	<Nav {toggleHelpModal} />
	<Grid />
	<Player />
</div>

<style>
	.preload {
		z-index: 2;
		background: hsla(270, 32%, 9%, 1);
		position: absolute;
		height: 100%;
		width: 100%;
	}

	.wrapper {
		background: var(--bg-body);
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		position: relative;
	}
</style>
