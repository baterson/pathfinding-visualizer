<script lang="ts">
	import { selectedAlgorithm } from '$lib/stores/algorithm';
	import { displayNames, type AlgorithmName } from '$lib/algorithms';
	import { pointerOutside } from '../actions/pointerOutside';
	import { tool } from '$lib/stores/tool';
	import { layout } from '$lib/stores/layout';
	import { player } from '$lib/stores/player';
	import { grid } from '$lib/stores/grid';
	import Border from './Border.svelte';

	let isOpen = false;

	const setIsOpen = () => {
		tool.set(null);
		isOpen = !isOpen;
	};

	const selectAlgorithm = (name: string) => {
		selectedAlgorithm.set(name as AlgorithmName);
		player.reset();
		grid.reset($layout.screen);
	};
</script>

<Border selected={isOpen}>
	<div class="wrapper" on:pointerdown={setIsOpen}>
		<div class="name">
			{displayNames[$selectedAlgorithm]}
		</div>

		{#if isOpen}
			<ul use:pointerOutside={{ cb: setIsOpen }}>
				{#each Object.entries(displayNames) as [key, displayName]}
					<li
						class:selected={$selectedAlgorithm === key}
						on:pointerdown={() => selectAlgorithm(key)}
					>
						{displayName}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</Border>

<style>
	.wrapper {
		height: 100%;
		grid-area: select;
		/* max-width: 160px; */
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24px;
		position: relative;
		font-weight: bold;
	}

	ul {
		z-index: 2;
		position: absolute;
		bottom: 8px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		list-style: none;
		background-color: var(--bg-body);
	}

	li {
		padding: 15px 10px;
	}

	li.selected {
		background-color: var(--select-active);
	}

	@media (min-width: 600px) {
		.wrapper {
			font-size: 28px;
		}
	}

	@media (min-width: 1024px) {
		.wrapper {
			font-size: 36px;
		}

		ul {
			bottom: 14px;
		}
	}

	@media (min-width: 1600px) {
		.wrapper {
			font-size: 36px;
		}
	}

	@media (hover) {
		li:hover {
			background-color: var(--select-active);
		}

		.wrapper:hover .name {
			background-color: var(--select-active);
			display: flex;
			align-items: center;
			justify-content: center;
			height: 70%;
			width: 60%;
		}
	}
</style>
