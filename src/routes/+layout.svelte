<script lang="ts">
	import { dev } from '$app/environment';
	import '../app.css';
	import { theme } from '$lib/stores/theme';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class:light={$theme === 'light'}>
	<slot />
</div>

<style>
	div {
		--main-white: #f0e8f4;
		--bg-body: #160f1d;
		--bg-interface: #22192b;

		--bg-start: #7084e9;
		--bg-end: #d39246;
		--bg-not-visited: #3b2d52;
		--bg-visited: #48368f;
		--bg-path: #5c71da;
		--bg-wall: #8e3c41;

		--bg-weight-3: #3b7945;
		--bg-weight-2: #449743;
		--bg-weight-1: #4dac4b;

		--bg-weight-tool: var(--bg-weight-2);
		--bg-wall-tool: var(--bg-wall);

		--bg-select: var(--bg-body);
		--select-active: var(--bg-path);

		color: var(--main-white);
	}

	.light {
		--bg-not-visited: var(--main-white);
	}
</style>
