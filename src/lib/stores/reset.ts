import { grid } from "$lib/stores/grid";
import { execution } from "$lib/stores/execution";
import { algorithmState } from "$lib/stores/algorithm";
import { resetNodes } from "$lib/stores/nodes";

export const resetState = (screen) => {

    execution.reset()
    algorithmState.set('notStarted');
    grid.createGrid(screen.row, screen.col)
    resetNodes()
}