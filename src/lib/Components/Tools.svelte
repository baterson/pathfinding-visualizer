<script lang="ts">
	import AlgoSelect from '$lib/Components/AlgoSelect.svelte';
	import Wall from '$lib/Components/Tools/Wall.svelte';
	import Weight from '$lib/Components/Tools/Weight.svelte';
	import Reset from '$lib/Components/Tools/Reset.svelte';
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
		flex: 0.6;
		display: flex;
		justify-content: space-between;
	}

	.tools {
		flex: 1;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
</style>
