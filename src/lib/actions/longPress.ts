import throttle from 'lodash.throttle';

export const longPress = (node, { onStart, onPress, onCancel }) => {
    let isPressed = false

    const handleLongPress = () => {
        if (isPressed) {
            onPress();
            return requestAnimationFrame(handleLongPress)
        } else {
            return
        }
    }

    const cancelPress = () => {
        isPressed = false
        onCancel();
    }

    const handlePointerDown = () => {
        isPressed = true
        onStart();
        return handleLongPress()
    }

    node.addEventListener('pointerdown', handlePointerDown)

    node.addEventListener('pointerup', cancelPress)

    return {
        destroy: () => {
            node.removeEventListener('pointerdown', handlePointerDown)
            node.removeEventListener('pointerup', cancelPress)

        }
    }
}
