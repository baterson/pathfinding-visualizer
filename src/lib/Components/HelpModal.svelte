<script>
	export let toggleModal;
</script>

<div class="wrapper" on:pointerdown={toggleModal}>
	<div class="content">
		<h3>PATHFINDING VISUALIZER</h3>

		<p>Pick an algorithm</p>
		<p>
			Select <span style="color: var(--bg-start)">Start</span> or
			<span style="color: var(--bg-end)">End</span> nodes to change algorithm direction
		</p>
		<p>Use Player to control the execution of the algorithm and travel through a history</p>
		<p>
			Select <span style="color: var(--bg-wall)">Walls</span> or
			<span style="color: var(--bg-weight-2)">Weight</span> from the menu and draw it on the grid
		</p>
		<section class="description">
			Only Dijkstra and A-star algorithms works with weighted nodes, other consider it as a regular
			node.
		</section>
	</div>
</div>

<style>
	.wrapper {
		z-index: 3;
		background: hsla(270, 32%, 9%, 0.8);
		color: var(--main-white);
		position: absolute;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: start;
	}

	h3 {
		font-size: 32px;
		letter-spacing: 3px;
	}

	.content {
		font-size: 18px;
		padding: 32px 4px 26px 12px;

		width: 100%;

		display: flex;
		flex-direction: column;
		gap: 18px;
		background: hsla(270, 32%, 9%, 1);
	}

	.description {
		color: #cdcdcd;
		display: flex;
		flex-direction: column;
		gap: 4px;
		font-size: 14px;
	}

	@media (min-width: 1024px) {
		.wrapper {
			align-items: center;
		}

		h3 {
			font-size: 64px;
		}

		.content {
			font-size: 1.4rem;
			padding: 40px;

			width: 70%;

			display: flex;
			flex-direction: column;
			gap: 20px;
			background: hsla(270, 32%, 9%, 1);
		}

		.description {
			color: #cdcdcd;
			font-size: 1rem;
		}
	}
</style>
