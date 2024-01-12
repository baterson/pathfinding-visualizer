<script>
	import Node from '$lib/Components/Node.svelte';
	import { inputListeners } from '$lib/actions/inputListeners';
	import { history } from '$lib/stores/history';
	import Controls from './Controls.svelte';
	import Icon from './Icon.svelte';
	import { theme } from '$lib/stores/theme';
	import { layout } from '$lib/stores/layout';
	import { CELL_SIZE, GRID_GAP } from '$lib/stores/grid';

	const changeTheme = () => {
		if (theme.get() === 'dark') {
			theme.set('light');
		} else {
			theme.set('dark');
		}
	};

	// <div class="navbar" on:click={changeTheme}>
	// 	<div><Icon name="sun" /></div>
	// 	<div class="rightNav">
	// 		<Icon name="faq" />
	// 		<Icon name="git" />
	// 	</div>
	// </div>
</script>

<div
	use:inputListeners
	class="wrapper"
	id="grid"
	style="--col:{$layout.screen.col};--row:{$layout.screen
		.row};--cell-size:{CELL_SIZE}px;--grid-gap:{GRID_GAP}px"
>
	{#each $history as { key, node } (key)}
		<Node {key} {node} />
	{/each}

	<Controls />
</div>

<style>
	.wrapper {
		position: relative;
		height: 100%;
		padding-top: 1px;
		gap: var(--grid-gap);
		display: grid;
		grid-template-columns: repeat(var(--col), var(--cell-size));
		grid-template-rows: repeat(var(--row), var(--cell-size));
	}

	/* .navbar {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		font-size: 2rem;
		display: flex;
		justify-content: space-between;
		padding: 8px;
		color: var(--color-nav-icon);
	} */

	@media (min-width: 1600px) {
		.wrapper {
			width: auto;
		}
	}
</style>
