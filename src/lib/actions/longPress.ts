import throttle from 'lodash.throttle';

export const longPress = (node: HTMLElement, { onPress }: { onPress: () => void }) => {
	let isPressed = false;
	const pr = throttle(onPress, 20);

	const handleLongPress = () => {
		if (isPressed) {
			pr();
			return requestAnimationFrame(handleLongPress);
		} else {
			return;
		}
	};

	const cancelPress = () => {
		isPressed = false;
	};

	const handlePointerDown = () => {
		isPressed = true;
		return handleLongPress();
	};

	node.addEventListener('pointerdown', handlePointerDown);

	node.addEventListener('pointerup', cancelPress);

	return {
		destroy: () => {
			node.removeEventListener('pointerdown', handlePointerDown);
			node.removeEventListener('pointerup', cancelPress);
		}
	};
};
