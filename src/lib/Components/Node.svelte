<script>
	import { animationQ, runSvelte } from '$lib/stores/animation';
	import { theme } from '$lib/stores/theme';
	import { toMapKey } from '../stores/grid';
	import { startNodeKey, endNodeKey, selectedNode, walls, weight } from '../stores/nodes';

	export let key;
	export let node;

	const getWeightOpacity = () => {
		let opacity;
		let currentWeight = $weight.get(key);

		if (!currentWeight) {
			return;
		} else if (currentWeight <= 3) {
			opacity = 0.4;
		} else if (currentWeight <= 7) {
			opacity = 0.5;
		} else {
			opacity = 0.6;
		}

		return opacity;
	};
</script>

<div
	id={toMapKey(node)}
	data-type="node"
	data-position={toMapKey(node)}
	data-startNode={$startNodeKey === toMapKey(node)}
	data-endNode={$endNodeKey === toMapKey(node)}
	data-visited={$endNodeKey === toMapKey(node)}
	style="--weight-opacity:{$weight.get(key) ? getWeightOpacity() : 0};"
	class="node"
	class:visited={node.visited}
	class:startNode={$startNodeKey === key}
	class:endNode={$endNodeKey === key}
	class:wall={$walls.has(key)}
	class:weight={$weight.has(key)}
	class:path={node.path}
	class:inSelect={$selectedNode === key}
	class:inAnimation={$runSvelte ? $animationQ.has(key) : null}
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
		70% {
			scale: rotate(0.7);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes _dropIn {
		0% {
			transform: scale(2);
		}
		35% {
			transform: scale(3);
		}
		70% {
			scale: rotate(2);
		}
		100% {
			transform: scale(1);
		}
	}
	/* @keyframes _dropIn {
		0% {
			transform: scale(0.7);
		}
		35% {
			transform: scale(0.9);
		}
		70% {
			scale: rotate(0.7);
		}
		100% {
			transform: scale(1);
		}
	} */

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

	.weight {
		font-size: 0.8rem;
		font-weight: 700;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		padding-right: 5px;
		padding-bottom: 2px;

		background-color: hsla(210, 100%, 72%, var(--weight-opacity));
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
