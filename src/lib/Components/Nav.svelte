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

<div class="nav left" on:pointerdown|stopPropagation={changeTheme}>
	{#if $theme === 'light'}
		<Icon name="moon" />
	{:else}
		<Icon name="sun" />
	{/if}
</div>
<div class="nav right">
	<div><Icon name="help" /></div>
	<div><Icon name="git" /></div>
</div>

<style>
	.nav {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		color: var(--color-nav);
		background-color: var(--bg-nav);
	}

	.left {
		left: 0;
		top: 0;
		padding: 8px 0;
		height: 64px;
		width: 64px;
	}

	.right {
		right: 0;
		top: 0;
		padding: 8px 0;
		height: 64px;
		width: 128px;
	}

	/* .wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: white;
	} */
</style>
