import { get, writable } from 'svelte/store';
import type { PlayerState, PlayerSpeed } from '$lib/types';
import { layout } from './layout';
import { grid } from './grid';

export const speedValues: PlayerSpeed[] = [1, 5, 10, 20];

export const speedDisplayNames: Record<PlayerSpeed, string> = {
	1: '2x',
	5: '1x',
	10: '0.5x',
	20: '0.25x'
};

const INITIAL_STATE: { speed: PlayerSpeed; state: PlayerState } = { speed: 1, state: 'notStarted' };

export const cancelFunction = writable<null | (() => void)>(null);

export const createPlayerStore = () => {
	const store = writable(INITIAL_STATE);

	const updateState = (state: PlayerState) =>
		store.update((current) => {
			if ((current.state === 'notStarted' || current.state === 'finished') && state !== 'play') {
				return current;
			}

			current.state = state;
			return current;
		});

	const play = () => {
		store.update((current) => {
			if (current.state === 'play') {
				current.state = 'pause';
			} else {
				current.state = 'play';
			}
			return current;
		});
	};

	const setSpeed = (speed: PlayerSpeed) => store.update((current) => ({ ...current, speed }));

	const incrSpeed = () => {
		store.update((current) => {
			const index = speedValues.indexOf(current.speed);
			if (index < 3) {
				current.speed = speedValues[index + 1];
			}

			return current;
		});
	};

	const decrSpeed = () => {
		store.update((current) => {
			const index = speedValues.indexOf(current.speed);
			if (index > 0) {
				current.speed = speedValues[index - 1];
			}

			return current;
		});
	};

	const reset = () => {
		cancelFunction.update((current) => {
			if (current) {
				current();
			}
			return null;
		});

		const { screen } = get(layout);

		grid.reset(screen);
		store.update((current) => ({ state: 'notStarted', speed: current.speed }));
	};

	return {
		subscribe: store.subscribe,
		updateState: updateState,
		play,
		setSpeed,
		incrSpeed,
		decrSpeed,
		reset
	};
};

export const player = createPlayerStore();
