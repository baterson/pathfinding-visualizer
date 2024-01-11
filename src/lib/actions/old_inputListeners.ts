import { getSelectedNode, selectedNode, setSelectedNode, toMapKey } from '$lib/stores/grid';
import { animationQ, queueAnimation, removeFromAnimationQ } from '$lib/stores/animation'
import { grid, setStartNodeKey, setEndNodeKey } from '$lib/stores/grid';
import { gridObjects } from '$lib/stores/gridObjects';
import { execution } from '$lib/stores/execution';
import { algorithm } from '$lib/stores/algorithm';
import { tool } from '$lib/stores/tool';

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
    // console.log('in animate');
    console.log('node:', node.id);

    if (node.id && node.id !== 'grid') {
        node.classList.add('inAnimation')
        // requestAnimationFrame(() => {
        // })
        // console.log('NODE', node);

        node.addEventListener('animationend', (e) => {
            // console.log('NODE', node);
            // console.log('e', e);


            node.classList.remove('inAnimation')
        }, { once: true })





        node.addEventListener('animationstart', (e) => {
            // console.log('START------');

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
        execution.reset()
        gridObjects.reset()
    }

    const handleKeyboardHotkeys = (e) => {
        if (e.code === 'Escape') {
            selectedNode.set(null);
        }

        if (e.code === 'KeyC') {
            execution.reset();
            return;
        }

        if (e.code === 'KeyX') {
            resetMap();
            return;
        }

        if (e.code === 'Space') {
            algorithm.playAlgorithm();
            return;
        }

        if (e.code === 'ArrowDown') {
            execution.incrSpeed();
        }

        if (e.code === 'ArrowUp') {
            execution.decrSpeed();
        }

        if (algorithm.isStarted()) {
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

    const handlePointerMove = (e) => {
        const { pageX, pageY } = e
        // console.log('node',);

        // const _node = document.elementFromPoint(pageX, pageY)
        // animateNode(node)
        // console.log('node', node.id);

        // GET from keys because of double walls drawing
        //


        const node = grid.getNodeByCoordinates({ x: pageX, y: pageY })
        // console.log('node', node.col, node.row);

        if (!node) {
            return
        }

        const _node = document.getElementById(toMapKey(node))
        // console.log('DOM _node', _node);


        if (tool.get() === 'wall') {
            if (!gridObjects.isWall(node)) {
                gridObjects.addWall(node)
                animateNode(_node)
                // requestAnimationFrame(() => {
                //     requestAnimationFrame(() => {
                //         animateNode(_node)
                //     })
                // })
            } else {
                // console.log('ANIMATE', _node);
                // console.log('bfor');

                // animateNode(_node)
            }
        } else if (tool.get() === 'weight') {
            animateNode(_node)

            gridObjects.incrWeight(node)

        } else {
            // console.log('HERE??? ');

            animateNode(_node)
            gridObjects.removeObject(node)
        }
        // animateNode(_node)


    }

    const handlePointerDown = (e) => {
        const { id } = e.target
        const _node = e.target
        const node = grid.getNodeByKey(id)
        const selectedNode = getSelectedNode()

        events.push(e)

        if (events.length === 1) {
            gridNode.addEventListener('pointermove', handlePointerMove)
        }

        if (!node) {
            return
        }

        if (e.pointerType === 'mouse' && e.button === 2) {
            tool.set(null)
            setSelectedNode(null)
            return
        }

        if (selectedNode) {
            if (grid.isStartNode(selectedNode) && !grid.isEndNode(node) && !gridObjects.isObject(node)) {
                setStartNodeKey(node)
                setSelectedNode(null)
            } else if (grid.isEndNode(selectedNode) && !grid.isStartNode(node) && !gridObjects.isObject(node)) {
                setEndNodeKey(node)
                setSelectedNode(null)
            }

            animateNode(_node)
            return
        }


        if (grid.isStartNode(node) || grid.isEndNode(node)) {
            execution.reset();
            tool.set(null)

            setSelectedNode(node)
            return
        }


        // events.push(e)


        // if (events.length === 1) {
        //     gridNode.addEventListener('pointermove', handlePointerMove)
        // }

        if (tool.get() === 'wall') {
            if (events.length === 1) {
                if (!gridObjects.isWall(node)) {
                    gridObjects.addWall(node)
                    // animateNode(_node)
                    animateNode(_node)

                    // requestAnimationFrame(() => {
                    //     animateNode(_node)
                    // })

                } else {
                    animateNode(_node)
                }
            } else {
                tool.set(null)
            }
            return
        } else if (tool.get() === 'weight') {
            gridObjects.incrWeight(node)
            animateNode(_node)
        } else {
            gridObjects.removeObject(node)
            animateNode(_node)
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
    gridNode.addEventListener('pointerup', handlePointerUp)


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
