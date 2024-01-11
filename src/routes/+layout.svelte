<script>
	import './app.css';
	import { onMount } from 'svelte';
	import { animationQ } from '$lib/stores/animation';

	// onMount(() => {
	// 	const grid = document.getElementById('grid');
	// 	grid.addEventListener('animationend', (e) => {
	// 		const id = e.target.id;

	// 		animationQ.update((current) => {
	// 			current.delete(id);
	// 			return current;
	// 		});
	// 	});

	// 	grid.addEventListener('animationcancel', (e) => {
	// 		const id = e.target.id;

	// 		animationQ.update((current) => {
	// 			current.delete(id);
	// 			return current;
	// 		});
	// 	});
	// });
</script>

<slot />
