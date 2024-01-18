<script lang="ts">
	import { animationQ } from '$lib/stores/animation';
	import { theme } from '$lib/stores/theme';
	import type { Node } from '$lib/types';
	import { startNodeKey, endNodeKey, selectedNodeKey, walls, weight } from '../stores/nodes';

	export let key: string;
	export let node: Node;

	const getLightWeight = (key) => {
		let currentWeight = $weight.get(key);
		if (!currentWeight) {
			return '';
		}

		let prefix;

		if (currentWeight <= 3) {
			prefix = 3;
		} else if (currentWeight <= 7) {
			prefix = 2;
		} else {
			prefix = 1;
		}

		return `var(--bg-weight-${prefix})`;
	};

	const getDarkWeight = (key) => {
		let currentWeight = $weight.get(key);
		if (!currentWeight) {
			return '';
		}

		let prefix;

		if (currentWeight <= 3) {
			prefix = 1;
		} else if (currentWeight <= 7) {
			prefix = 2;
		} else {
			prefix = 3;
		}

		return `var(--bg-weight-${prefix})`;
	};
</script>

<div
	id={key}
	data-type="node"
	style="--weight-dynamic-bg:{$weight.has(key) && $theme === 'light'
		? getLightWeight(key)
		: $weight.has(key) && $theme === 'dark'
			? getDarkWeight(key)
			: ''}"
	class="node"
	class:visited={node.visited}
	class:startNode={$startNodeKey === key}
	class:endNode={$endNodeKey === key}
	class:wall={$walls.has(key)}
	class:weight={$weight.has(key)}
	class:path={node.path}
	class:inSelect={$selectedNodeKey === key}
	class:inAnimation={$animationQ.has(key)}
>
	{#if $weight.has(key)}
		{$weight.get(key)}
	{/if}
</div>

<style>
	@keyframes dropIn {
		0% {
			transform: scale(0.7);
		}
		35% {
			transform: scale(0.9);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes inSelect {
		0%,
		50% {
			transform: scale(0.8);
		}
		25%,
		75% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(0.9);
		}
	}

	.node {
		height: 30px;
		width: 30px;
		min-height: 30px;
		min-width: 30px;
		flex-shrink: 0;

		font-size: 0.8rem;
		font-weight: 700;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		padding-right: 5px;
		padding-bottom: 2px;

		color: var(--color-weight);
		background-color: var(--bg-not-visited);
	}

	.visited {
		transition: background-color ease-in-out 0.5s;
		background-color: var(--bg-visited);
	}

	:not(.wall):not(.startNode):not(.endNode):not(.weight):not(.visited) {
		transition: background-color ease-in-out 0.5s;

		background-color: var(--bg-not-visited);
	}

	.startNode {
		background-color: var(--bg-start);
	}

	.endNode {
		background-color: var(--bg-end);
	}

	.wall {
		background-color: var(--bg-wall);
	}

	.weight:not(.visited) {
		background-color: var(--weight-dynamic-bg);
	}

	.path {
		transition: background-color ease-in-out 0.5s;
		background-color: var(--bg-path);
	}

	/* Animations */

	.inSelect {
		animation: inSelect 1s cubic-bezier(0.39, 0.575, 0.565, 1) infinite;
	}

	.inAnimation {
		animation-name: dropIn;
		animation: dropIn 0.5s ease-in-out;
	}
</style>
