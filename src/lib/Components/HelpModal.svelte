<script>
	export let handleClose;
</script>

<div class="wrapper" on:pointerdown={handleClose}>
	<div class="content">
		<h3>Algorithm Visualizer</h3>
		<p>Use Wall to Place Hello next</p>
		<p>Hello Big</p>
		<p>Hello Big</p>
	</div>
</div>

<style>
	.wrapper {
		z-index: 3;
		background: hsla(270, 32%, 9%, 0.8);
		color: white;
		position: absolute;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32px;
	}

	.content {
		/* padding: 20px; */
		/* height: 60%;
		width: 100%; */
		height: 60%;
		width: 60%;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: hsla(270, 32%, 9%, 1);
	}
</style>
