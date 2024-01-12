<script>
	import { algorithmState, selectedAlgorithm } from '$lib/stores/algorithm';
	import { displayNames } from '$lib/algorithms';
	import { pointerOutside } from '../actions/pointerOutside';
	import { tool } from '$lib/stores/tool';
	import { resetState } from '$lib/stores/reset';
	import { layout } from '$lib/stores/layout';

	let isOpen = false;

	const setIsOpen = () => {
		tool.set(null);
		isOpen = !isOpen;
	};

	const selectAlgorithm = (name) => {
		resetState($layout.screen);
		algorithmState.set('notStarted');
		selectedAlgorithm.set(name);
	};
</script>

<div class="wrapper" on:pointerdown={setIsOpen}>
	<div class="current">
		{displayNames[$selectedAlgorithm]}
	</div>

	{#if isOpen}
		<ul use:pointerOutside on:pointer_outside={setIsOpen}>
			{#each Object.entries(displayNames) as [key, displayName]}
				<li class:selected={$selectedAlgorithm === key} on:pointerdown={() => selectAlgorithm(key)}>
					{displayName}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.wrapper {
		height: 100%;
		min-width: 160px;
		/* min-width: 156px; */
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24px;
		color: white;
		position: relative;
		font-weight: bold;
		border: 2px solid var(--bg-body);
		border-top: none;
		border-left: none;
	}

	ul {
		z-index: 2;
		position: absolute;
		bottom: -1px;
		left: -1px;
		width: calc(100% + 2px);
		display: flex;
		flex-direction: column;
		list-style: none;
		background-color: var(--bg-select);
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
			min-width: 256px;
		}
	}

	@media (min-width: 1024px) {
		.wrapper {
			font-size: 36px;
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
	}
</style>
