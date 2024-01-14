import { grid } from "$lib/stores/grid";
import { player } from "$lib/stores/player";
import { algorithmState } from "$lib/stores/algorithm";
import { resetNodes } from "$lib/stores/nodes";

export const resetExecution = (screen) => {
    player.reset()
    algorithmState.set('notStarted');
    grid.createGrid(screen.row, screen.col)
}

export const resetState = (screen) => {
    resetExecution(screen)
    resetNodes()
}