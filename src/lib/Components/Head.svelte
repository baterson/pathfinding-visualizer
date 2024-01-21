<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';

	onMount(() => {
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}

		gtag('js', new Date());
		gtag('config', env.PUBLIC_GTAG_KEY);
	});
</script>

<svelte:head>
	<meta name="author" content="Ivan Semochkin" />
	<meta
		name="description"
		content="Pathfinding Algorithms Visualizer build with Svelte and TypeScript"
	/>

	<meta
		property="og:image"
		content="https://ivan-sem.com/pathfinding_visualizer/static/algo-screen.png"
	/>
	<meta
		property="og:image:secure_url"
		content="https://ivan-sem.com/pathfinding_visualizer/static/algo-screen.png"
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="600" />
	<meta
		property="og:image:alt"
		content="Pathfinding Algorithms Visualizer build with Svelte and TypeScript."
	/>
	<meta property="og:title" content="Pathfinding Visualizer" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://ivan-sem.com/pathfinding_visualizer" />
	<meta
		property="og:description"
		content="Pathfinding Algorithms Visualizer build with Svelte and TypeScript."
	/>
	<meta property="og:locale" content="en_US" />
	<title>Pathfinding Visualizer</title>
	<meta
		name="description"
		content="Pathfinding Algorithms Visualizer build with Svelte and TypeScript."
	/>

	<!-- Twitter Meta Tags -->
	<meta property="twitter:domain" content="ivan-sem.com" />
	<meta property="twitter:url" content="https://ivan-sem.com/pathfinding_visualizer" />
	<meta name="twitter:title" content="Pathfinding Visualizer" />
	<meta
		name="twitter:description"
		content="Pathfinding Algorithms Visualizer build with Svelte and TypeScript."
	/>
	<meta
		name="twitter:image"
		content="https://ivan-sem.com/pathfinding_visualizer/static/algo-screen.png"
	/>

	<meta name="theme-color" content="#22192B" />

	{#if env.PUBLIC_GTAG_KEY}
		<script async src="https://www.googletagmanager.com/gtag/js?id={env.PUBLIC_GTAG_KEY}"></script>
	{/if}
</svelte:head>
