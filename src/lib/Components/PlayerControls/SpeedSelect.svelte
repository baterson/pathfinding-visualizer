<script lang="ts">
	import { player, speedValues, speedDisplayNames } from '$lib/stores/player';
	import { pointerOutside } from '../../actions/pointerOutside';
	import Icon from '../Icon.svelte';

	let isOpen = false;

	let setIsOpen = () => {
		isOpen = !isOpen;
	};
</script>

<div on:pointerdown={setIsOpen}>
	<div class="wrapper">
		<div class="speedValue">{speedDisplayNames[$player.speed]}</div>
		<Icon name="playSpeed" />
		{#if isOpen}
			<ul use:pointerOutside={{ cb: setIsOpen }}>
				{#each speedValues as key}
					<li
						class="item"
						class:selected={$player.speed === key}
						on:pointerdown={() => player.setSpeed(key)}
					>
						{speedDisplayNames[key]}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		font-size: 18px;
		position: relative;
	}

	ul {
		list-style: none;
		right: 0;
		bottom: 0;
		position: absolute;
		display: flex;
		flex-direction: column;
		z-index: 2;
		background-color: var(--bg-select);
	}

	li {
		padding: 16px 18px 16px 16px;
	}
	.speedValue {
		position: absolute;
		right: 34px;
		bottom: 0;
	}

	li.selected {
		background-color: var(--select-active);
	}

	@media (min-width: 1024px) {
		li:hover {
			background-color: var(--select-active);
		}
	}

	@media (min-width: 1600px) {
		.wrapper {
			font-size: 22px;
		}

		.speedValue {
			right: 48px;
			bottom: 5px;
		}
	}
</style>
