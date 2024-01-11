<script>
	import { selectedNode } from '$lib/stores/grid';
	import { animationQ, runSvelte } from '$lib/stores/animation';
	import { theme } from '$lib/stores/theme';
	import { startNodeKey, endNodeKey, toMapKey } from '../stores/grid';
	import { gridObjects } from '$lib/stores/gridObjects';
	import { onMount } from 'svelte';

	export let key;
	export let node;

	// onMount((n) => {
	// 	console.log('nnn', n);
	// });

	const getWeightColor = () => {
		let opacity;
		const light = $theme === 'dark' ? 0.1 : 0;
		// const light = 0;
		let weight = $gridObjects.weight.get(toMapKey(node));

		if (!weight) {
			return;
		} else if (weight <= 3) {
			opacity = 0.5;
		} else if (weight <= 7) {
			opacity = 0.6;
		} else {
			opacity = 0.7;
		}

		return `hsla(220, 100%, 72%, ${opacity})`;
	};

	// class:wall={$gridObjects.walls.has(toMapKey(node))}
	// class:inAnimation={null}
	// data-wall={$gridObjects.walls.has(toMapKey(node))}
</script>

<div
	id={toMapKey(node)}
	data-type="node"
	data-position={toMapKey(node)}
	data-startNode={$startNodeKey === toMapKey(node)}
	data-endNode={$endNodeKey === toMapKey(node)}
	data-visited={$endNodeKey === toMapKey(node)}
	style="--weight-dynamic-bg: {getWeightColor()}"
	class="node"
	class:notVisited={!node.visited}
	class:visited={node.visited}
	class:startNode={$startNodeKey === key}
	class:endNode={$endNodeKey === key}
	class:path={node.path}
	class:weight={$gridObjects.weight.has(key)}
	class:inSelect={toMapKey($selectedNode) === key}
	class:wall={$gridObjects.walls.has(key)}
	class:inAnimation={$runSvelte ? $animationQ.has(key) : null}
>
	<!-- {#if $gridObjects.weight.has(toMapKey(node))}
		{$gridObjects.weight.get(toMapKey(node))}
	{/if} -->
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
		/* transition: all ease-in-out 0.5s; */

		height: 1.9rem;
		width: 1.9rem;
		font-size: 0.8rem;
		padding-right: 5px;
		padding-bottom: 2px;
		color: var(--color-weight);

		font-weight: 700;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
	}

	.notVisited {
		/* transition: background-color ease-in-out 0.5s; */
		background-color: var(--bg-not-visited);
	}

	.visited {
		background-color: var(--bg-visited);
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
		background-color: var(--weight-dynamic-bg);
	}

	.path {
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
