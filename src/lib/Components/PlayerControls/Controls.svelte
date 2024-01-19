<script lang="ts">
	import Icon from '$lib/Components/Icon.svelte';
	import { player } from '$lib/stores/player';
	import SpeedSelect from './SpeedSelect.svelte';
	import { longPress } from '$lib/actions/longPress';
	import { selectedNodeKey } from '$lib/stores/nodes';
	import { tool } from '$lib/stores/tool';

	export let playAlgorithm: () => Promise<void>;
</script>

<div
	class="wrapper"
	on:pointerdown={() => {
		tool.set(null);
		selectedNodeKey.set(null);
	}}
>
	<SpeedSelect />
	<button
		id="player-backward"
		tabindex="-1"
		aria-label="backward"
		use:longPress={{ onPress: () => player.updateState('backward') }}
		on:pointerdown={() => player.updateState('backward')}
		class:disabled={$player.state === 'notStarted' || $player.state === 'finished'}
		on:keydown|preventDefault={() => {}}
	>
		<Icon name="playBack" />
	</button>
	<button
		tabindex="-1"
		class="play"
		aria-label="play"
		on:keydown|preventDefault={() => {}}
		on:pointerdown={playAlgorithm}
	>
		{#if $player.state === 'finished'}
			<Icon name="replay" />
		{:else if $player.state === 'play'}
			<Icon name="pause" />
		{:else}
			<Icon name="play" />
		{/if}
	</button>
	<button
		class:disabled={$player.state === 'notStarted' || $player.state === 'finished'}
		tabindex="-1"
		id="player-forward"
		aria-label="forward"
		use:longPress={{ onPress: () => player.updateState('forward') }}
		on:keydown|preventDefault={() => {}}
	>
		<Icon name="playForward" />
	</button>
	<button tabindex="-1" on:pointerdown={player.reset} aria-label="reset">
		<Icon name="stop" />
	</button>
</div>

<style>
	.wrapper {
		/* width: 100%; */
		grid-area: controls;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 16px;
		color: var(--color-player);
	}

	button {
		padding: 0;
		background: transparent;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		color: inherit;
	}

	button.disabled:hover {
		color: var(--color-player);
		cursor: not-allowed;
	}
	.play {
		font-size: 64px;
	}

	.play:hover {
		transform: scale(1.1);
	}

	@media (min-width: 1600px) {
		button {
			font-size: 42px;
			margin: 0 6px;
		}

		.play {
			font-size: 86px;
		}
	}
</style>
