<div class="wrapper">
	<slot />
	<div class="border"></div>
</div>

<style>
	.wrapper {
		position: relative;
	}

	.border {
		position: absolute;
		transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		background-color: var(--bg-tool-border);
		height: 2px;
		left: 20%;
		width: 60%;
		bottom: 10px;
	}
</style>
