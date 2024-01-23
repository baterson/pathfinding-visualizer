export function pointerOutside(node: HTMLElement, { cb }: { cb: () => void }) {
	const handlePointerOutside = (event: Event) => {
		if (node && !node.contains(event.target as typeof node) && !event.defaultPrevented) {
			event.stopPropagation();
			cb();
		}
	};

	document.addEventListener('pointerdown', handlePointerOutside, true);

	return {
		destroy() {
			document.removeEventListener('pointerdown', handlePointerOutside, true);
		}
	};
}
