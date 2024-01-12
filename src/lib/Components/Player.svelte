<script>
	import Icon from './Icon.svelte';
	import { algorithmState } from '$lib/stores/algorithm';
	import { execution } from '$lib/stores/execution';
	import SpeedSelect from './SpeedSelect.svelte';
	import { longPress } from '$lib/actions/longPress';
	import { setSelectedNode } from '$lib/stores/nodes';
	import { tool } from '$lib/stores/tool';
	import { resetState } from '$lib/stores/reset';
	import { layout } from '$lib/stores/layout';

	export let handlePlay;

	const handlePressStart = () => {
		if (!$execution.isPaused) {
			execution.play();
		}
	};

	const forward = () => execution.setInForward(true);

	const backward = () => execution.setInBackward(true);

	// TODO refactor to state var ie execution = 'inFor' || 'inBack'
	const stopHistory = () => {
		execution.setInBackward(false);
		execution.setInForward(false);
	};
</script>

<div
	class="wrapper"
	on:pointerdown={() => {
		tool.set(null);
		setSelectedNode(null);
	}}
>
	<SpeedSelect />
	<button
		id="player-backward"
		use:longPress={{ onStart: handlePressStart, onPress: backward, onCancel: stopHistory }}
		tabindex="-1"
		class:disabled={$algorithmState !== 'started'}
		on:keydown|preventDefault={() => {}}
	>
		<Icon name="playBack" />
	</button>
	<button
		tabindex="-1"
		class="play"
		on:keydown|preventDefault={() => {}}
		on:pointerdown={handlePlay}
	>
		{#if $algorithmState === 'finished'}
			<Icon name="replay" />
		{:else if $execution.isPaused || $algorithmState === 'notStarted'}
			<Icon name="play" />
		{:else}
			<Icon name="pause" />
		{/if}
	</button>
	<button
		class:disabled={$algorithmState !== 'started'}
		tabindex="-1"
		id="player-forward"
		use:longPress={{ onStart: handlePressStart, onPress: forward, onCancel: stopHistory }}
		on:keydown|preventDefault={() => {}}
	>
		<Icon name="playForward" />
	</button>
	<button tabindex="-1" on:pointerdown={resetState}>
		<Icon name="stop" />
	</button>
</div>

<style>
	.wrapper {
		flex: 1;
		width: 100%;
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
		font-size: 32px;
	}

	button.disabled:hover {
		color: var(--color-player);
		cursor: not-allowed;
	}

	button:hover {
		color: white;
	}

	.play {
		color: white;
		font-size: 68px;
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
