<script lang="ts">
	export let selected: boolean;
</script>

<div class="wrapper">
	<slot />
	<div class="border" class:selected></div>
</div>

<style>
	.wrapper {
		position: relative;
		height: 100%;
	}

	.border {
		position: absolute;
		transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		background-color: var(--bg-tool-border);
		height: 2px;
		left: 20%;
		width: 60%;
		bottom: 6px;
		opacity: 0.7;
	}

	.border.selected {
		left: 0;
		transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		width: 100%;
		opacity: 1;
	}

	@media (min-width: 1024px) {
		.border {
			bottom: 12px;
		}
	}
</style>
