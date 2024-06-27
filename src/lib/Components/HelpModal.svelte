<script lang="ts">
	export let toggleModal: () => void;
</script>

<div class="wrapper" on:pointerdown={toggleModal}>
	<article class="content">
		<header>
			<h1>PATHFINDING VISUALIZER</h1>
		</header>

		<p>Pick an algorithm.</p>
		<p>
			Select <span style="color: var(--bg-start)">Start</span> or
			<span style="color: var(--bg-end)">End</span> to change the direction of the algorithm.
		</p>
		<p>
			Use the Player to control the execution of the algorithm and navigate through the history.
		</p>
		<p>
			Select <span style="color: var(--bg-wall)">Walls</span> or
			<span style="color: var(--bg-weight-2)">Weights</span> from the menu and draw them on the grid.
		</p>
		<section class="description">
			<h2>Algorithm Details</h2>
			<p>
				Only the Dijkstra and A-star algorithms work with weighted nodes; other algorithms treat
				them as regular nodes.
			</p>
			<p>Visited nodes can't be modified.</p>
		</section>
	</article>
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

	h1 {
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

		h1 {
			font-size: 64px;
		}

		.content {
			font-size: 1.4rem;
			padding: 40px;

			width: 70%;

			display: flex;
			flex-direction: column;
			gap: 20px;
			background: var(--bg-body);
		}

		.description {
			color: #cdcdcd;
			font-size: 1rem;
		}
	}
</style>
