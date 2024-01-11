<script>
	import Controls from '$lib/Components/Controls.svelte';
	import Grid from '$lib/Components/Grid.svelte';
	import Icon from '$lib/Components/Icon.svelte';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	console.log('THED EDDDD', dev);

	onMount(() => {
		theme.subscribe((theme) => {
			if (theme === 'light') {
				document.body.classList.remove('dark');
				document.body.classList.add('light');
			} else {
				document.body.classList.remove('light');
				document.body.classList.add('dark');
			}
		});
	});
</script>

<div class="wrapper">
	<Grid />
</div>

<style>
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
