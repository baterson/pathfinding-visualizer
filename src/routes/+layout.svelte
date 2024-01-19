<script lang="ts">
	import '../app.css';
	import '@fontsource/jetbrains-mono';
</script>

<svelte:head>
	<title>Website</title>
	<meta name="theme-color" content="#319197" />
</svelte:head>

<slot />

<style global>
	body {
		font-family: 'JetBrains Mono', monospace;
		/* font-family: monospace; */
		/* font-size: 14px; */
	}
</style>
