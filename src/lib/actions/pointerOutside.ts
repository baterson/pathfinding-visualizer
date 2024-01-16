export function pointerOutside(node) {

    const handlePointerOutside = event => {
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            event.stopPropagation();

            node.dispatchEvent(
                new CustomEvent('pointer_outside', node)
            )
        }
    }

    document.addEventListener('pointerdown', handlePointerOutside, true);

    return {
        destroy() {
            document.removeEventListener('pointerdown', handlePointerOutside, true);
        }
    }
}