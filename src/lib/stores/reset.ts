import { grid } from "$lib/stores/grid";
import { execution } from "$lib/stores/execution";
import { resetPath } from "$lib/stores/nodes";
// import { algorithmState } from "$lib/stores/algorithm";

export const resetState = (screen) => {
    execution.reset()
    // algorithmState.set('notStarted');

    grid.createGrid(screen.row, screen.col)
    resetPath()
}