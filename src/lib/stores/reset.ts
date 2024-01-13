import { grid } from "$lib/stores/grid";
import { execution } from "$lib/stores/execution";
import { algorithmState } from "$lib/stores/algorithm";
import { resetNodes } from "$lib/stores/nodes";

export const resetExecution = (screen) => {
    execution.reset()
    algorithmState.set('notStarted');
    grid.createGrid(screen.row, screen.col)
}

export const resetState = (screen) => {
    resetExecution(screen)
    resetNodes()
}