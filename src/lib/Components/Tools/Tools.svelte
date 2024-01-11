<script>
	import AlgoSelect from '$lib/Components/AlgoSelect.svelte';
	import Wall from './Wall.svelte';
	import Weight from './Weight.svelte';
	import Reset from './Reset.svelte';
	import { algorithm } from '$lib/stores/algorithm';
	import { execution } from '$lib/stores/execution';
	import { tool } from '$lib/stores/tool';

	// name="wall"
	// --default-color="hsla(0, 5%, 100%, 30%);"
	// 		--active-color="var(--wall-color);"

	// name="weight"
	// 		--default-color="hsla(220, 100%, 72%, 30%)"
	// 		--active-color="hsla(220, 100%, 72%, 80%)"
</script>

<div class="wrapper">
	<AlgoSelect />
	<div class="tools">
		<Weight name="weight" />
		<Wall name="wall" />
		<Reset name="reset" />
	</div>
</div>

<style>
	.wrapper {
		/* transition: background-color ease-in-out 0.5s;
		background-color: var(--tool-bg); */
		flex: 0.6;
		gap: 30px;
		display: flex;
		justify-content: space-between;
	}

	.tools {
		flex: 1;
		height: 100%;
		display: flex;
		gap: 20px;
		align-items: center;
		justify-content: space-evenly;
	}
</style>
