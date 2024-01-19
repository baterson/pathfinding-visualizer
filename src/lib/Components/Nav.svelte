<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import Icon from './Icon.svelte';

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
		<div><Icon name="help" /></div>
		<div><Icon name="git" /></div>
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
</style>
