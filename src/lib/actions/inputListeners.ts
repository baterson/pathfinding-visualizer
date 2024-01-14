import { animationQ, queueAnimation, queueAnimationByKey, removeFromAnimationQ, removeFromAnimationQByKey, runSvelte } from '$lib/stores/animation'
import { setStartNodeKey, setEndNodeKey, getSelectedNode, placeSelectedNode, setSelectedNode } from '$lib/stores/nodes';
import { grid, toMapKey } from '$lib/stores/grid';
import { execution } from '$lib/stores/execution';
import { tool } from '$lib/stores/tool';
import { get } from 'svelte/store';

// const animateNode = (node) => {
//     const _node = document.getElementById(toMapKey(node))
//     if (!_node) {
//         return
//     }
//     queueAnimation(node)

//     _node.addEventListener('animationend', () => {
//         removeFromAnimationQ(node)
//         // node.classList.remove('inAnimation')
//     }, { once: true })
// }

const animateNode = (node) => {
    if (node.id && node.id !== 'grid') {
        node.classList.add('inAnimation')

        node.addEventListener('animationend', (e) => {
            node.classList.remove('inAnimation')
        }, { once: true })

        node.addEventListener('animationcancel', (e) => {
            node.classList.remove('inAnimation')
            console.log('CANCEL-----');

        }, { once: true })
    }
}

export const inputListeners = (gridNode) => {

    let events = []

    const resetMap = () => {
        player.reset()
    }

    const handleKeyboardHotkeys = (e) => {
        if (e.code === 'Escape') {
            selectedNode.set(null);
        }

        if (e.code === 'KeyC') {
            player.reset();
            return;
        }

        if (e.code === 'KeyX') {
            resetMap();
            return;
        }

        if (e.code === 'Space') {
            // algorithm.playAlgorithm();
            return;
        }

        if (e.code === 'ArrowDown') {
            execution.incrSpeed();
        }

        if (e.code === 'ArrowUp') {
            execution.decrSpeed();
        }

        if (true) {
            if (execution.get().isPaused) {
                if (e.code === 'ArrowLeft') {
                    execution.setInBackward(true);
                } else if (e.code === 'ArrowRight') {
                    execution.setInForward(true);
                }
            }
        }
    }

    const handleWheel = (e) => {
        if (e.deltaY < 0) {
            execution.incrSpeed();
        } else if (e.deltaY > 0) {
            execution.decrSpeed();
        }
    }

    const _handlePointerMove = (e) => {
        // const { pageX, pageY } = e

        const _node = document.elementFromPoint(pageX, pageY)
        // const node = grid.getNodeByCoordinates({ x: pageX, y: pageY })
        // if (!node) {
        //     return
        // }

        // const _node = document.getElementById(toMapKey(node))

        // animateNode(_node)

        const isWall = _node.dataset.isWall

        if (!_node.id || _node.id === 'grid') {
            return
        }


        if (tool.get() === 'wall') {
            if (events.length === 1) {
                if (canAddWall(_node)) {
                    console.log('---addding');

                    // gridObjects.addWall(_node.id)

                    requestAnimationFrame(() => {
                        animateNode(_node)
                    })
                } else {
                    requestAnimationFrame(() => {
                        animateNode(_node)
                    })
                }
            }
        } else {
            requestAnimationFrame(() => {
                animateNode(_node)
            })

        }
    }


    const canAddWall = (node) => {
        const { startNode, endNode, visited } = node.dataset
        return [startNode, endNode, visited].some(item => item !== 'true')
    }


    const animateWithSvelte = (id) => {
        queueAnimationByKey(id)

        const node = document.getElementById(id)

        node.addEventListener('animationend', () => {
            console.log('---animation end');

            removeFromAnimationQByKey(id)
        }, { once: true })

        node.addEventListener('animationcancel', () => {
            console.log('---animation cancel');

            removeFromAnimationQByKey(id)
        }, { once: true })
    }

    const animateWithCSS = (id) => {
        const node = document.getElementById(id)
        node.classList.add('inAnimation')

        node.addEventListener('animationend', () => {
            console.log('---animation end');

            node.classList.remove('inAnimation')
        }, { once: true })

        node.addEventListener('animationcancel', () => {
            console.log('---animation cancel');

            node.classList.remove('inAnimation')
        }, { once: true })
    }

    const addWallSvelte = (node) => {
        if (canAddWall(node)) {
            // gridObjects.addWall(node.id)
        }
    }

    const ANIMATE = (id) => {
        if (get(runSvelte)) {
            return animateWithSvelte(id)
        } else {
            return animateWithCSS(id)
        }
    }

    const ADD_WALL = (node) => {
        addWallSvelte(node)

        // if (get(runSvelte)) {
        //     return addWallSvelte(node)
        // } else {
        //     return addWallCSS(node)
        // }
    }

    const handlePointerMove = (e) => {
        const node = document.elementFromPoint(e.clientX, e.clientY)
        const position = node.dataset.position

        if (!position) {
            return
        }

        animateWithSvelte(position)
    }

    const handleToolMove = (e) => {
        const node = document.elementFromPoint(e.clientX, e.clientY)

        if (!node.dataset.position) {
            return
        }

        ADD_WALL(node)

        ANIMATE(node.dataset.position)
    }

    const setupPointerTracking = () => {
        if (tool.get()) {
            gridNode.addEventListener('pointermove', handleToolMove)
        } else {
            gridNode.addEventListener('pointermove', handlePointerMove)
        }


        gridNode.addEventListener('pointerup', () => {
            gridNode.removeEventListener('pointermove', handlePointerMove)
            gridNode.removeEventListener('pointermove', handleToolMove)
        }, { once: true })
    }

    const handlePointerDown = (e) => {
        const node = e.target
        const position = node.dataset.position
        const key = toMapKey(position)

        // Not hit a Node
        if (!position) {
            setupPointerTracking()
            return
        }

        // RMB cancels selected Tool
        if (e.pointerType === 'mouse' && e.button === 2) {
            tool.set(null)
            setSelectedNode(null)
            return
        }

        // Start/End Node already selected
        if (getSelectedNode()) {
            placeSelectedNode(position)
            animateWithSvelte(position, node)
            return
        }

        // Select Start/End node or animate grid nodes
        if (grid.isStartNode(position) || grid.isEndNode(position)) {
            setSelectedNode(position)
        } else {
            animateWithSvelte(position)
            setupPointerTracking()
        }
    }

    const handlePointerUp = () => {
        events.pop()

        if (!events.length) {
            gridNode.removeEventListener('pointermove', handlePointerMove)
        }
    }

    const disableContextMenu = (e) => {
        e.preventDefault()
    }

    gridNode.addEventListener('pointerdown', handlePointerDown)
    // gridNode.addEventListener('pointerup', handlePointerUp)


    window.addEventListener('contextmenu', disableContextMenu)
    window.addEventListener('keydown', handleKeyboardHotkeys)
    window.addEventListener('wheel', handleWheel)

    return {
        destroy() {
            gridNode.removeEventListener('pointerdown', handlePointerDown)
            window.removeEventListener('keydown', handleKeyboardHotkeys)
            window.removeEventListener('wheel', handleWheel)
            window.removeEventListener('contextmenu', disableContextMenu)
        }
    };
}
