<script lang="ts">
	import Wall from '$lib/Components/Tools/Wall.svelte';
	import Weight from '$lib/Components/Tools/Weight.svelte';
	import Reset from '$lib/Components/Tools/Reset.svelte';
</script>

<div class="wrapper">
	<Weight name="weight" />
	<Wall name="wall" />
	<Reset name="reset" />
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	.wrapper {
		grid-area: tools;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
</style>
