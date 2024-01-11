<script>
	import Node from '$lib/Components/Node.svelte';
	import { inputListeners } from '$lib/actions/inputListeners';
	import { history } from '$lib/stores/history';
	import Controls from './Controls.svelte';
	import Icon from './Icon.svelte';
	import { theme } from '$lib/stores/theme';
	import { GRID_COLUMNS } from '$lib/stores/grid';

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

<div use:inputListeners class="wrapper" id="grid" style="--columns:{GRID_COLUMNS}">
	{#each $history as { key, node } (key)}
		<Node {key} {node} />
	{/each}

	<Controls />
</div>

<style>
	.wrapper {
		position: relative;
		height: 100%;
		width: 100%;
		gap: 2px;
		display: grid;
		grid-template-columns: repeat(20, 30px);
		grid-template-rows: repeat(20, 30px);
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
