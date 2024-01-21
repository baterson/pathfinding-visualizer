<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import Icon from './Icon.svelte';

	export let toggleHelpModal: () => void;

	const changeTheme = () => {
		if ($theme === 'dark') {
			theme.set('light');
		} else {
			theme.set('dark');
		}
	};
</script>

<div class="wrapper">
	<div class="nav" on:pointerdown|stopPropagation={changeTheme}>
		{#if $theme === 'light'}
			<Icon name="moon" />
		{:else}
			<Icon name="sun" />
		{/if}
	</div>
	<div class="nav">
		<div on:pointerdown={toggleHelpModal}><Icon name="help" /></div>
		<a rel="external" target="_blank" href="https://github.com/baterson/pathfinding-visualizer">
			<Icon name="git" />
		</a>
	</div>
</div>

<style>
	.wrapper {
		height: 63px;
		padding: 10px 20px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--bg-interface);
		color: var(--color-nav);
	}
	.nav {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		height: 100%;
		gap: 20px;
	}

	a {
		color: var(--main-white);
		text-decoration: none;
	}
</style>
