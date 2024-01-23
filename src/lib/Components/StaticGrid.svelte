<script lang="ts">
	import Node from '$lib/Components/Node.svelte';
	import { createGridMap } from '$lib/stores/grid';
	import { fade } from 'svelte/transition';

	const grid = [...createGridMap(50, 50)].map((el) => ({ key: el[0], node: el[1] }));
</script>

<div class="wrapper" transition:fade>
	{#each grid as { key, node } (key)}
		<Node {node} />
	{/each}
</div>

<style>
	.wrapper {
		position: relative;
		padding-top: 1px;
		gap: 2px;
		display: grid;
		grid-template-columns: repeat(50, 30px);
		grid-template-rows: repeat(50, 30px);
	}
</style>
