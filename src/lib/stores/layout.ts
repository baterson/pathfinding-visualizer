import { writable } from 'svelte/store';
import { tick } from 'svelte';

const INITIAL_STATE = {
    screen: { row: 0, col: 0 },
    player: { row: 0, col: 0, height: 0, width: 0 },
    isCalculating: true
};

const createLayoutStore = () => {
    const { subscribe, update } = writable(INITIAL_STATE);

    const setLayout = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const screenCols = Math.round(screenWidth / 32);
        const screenRows = Math.round(screenHeight / 32);

        const player = getPlayerLayout(screenHeight, screenCols, screenRows);

        update((current) => {
            current.screen.row = screenRows;
            current.screen.col = screenCols;
            current.player = player;
            current.isCalculating = true;
            return current;
        });

        tick().then(() => {
            update((current) => {
                current.isCalculating = false;
                return current;
            });
        });
    };

    const getPlayerLayout = (screenHeight: number, screenCols: number, screenRows: number) => {
        let playerRows = 4;
        let playerCols;

        const emptyVerticalSpace = (screenHeight % 32) - 1;

        console.log('screenRows', screenRows);

        // if (screenRows <= 22) {
        //     playerRows = 4;
        // } else if (screenRows <= 35) {
        //     playerRows = 2;
        // } else {
        //     playerRows = 4
        // }

        // if (screenRows <= 22) {
        //     playerRows = 4;
        // } else {
        //     playerRows = 4;
        // }

        if (screenCols <= 30) {
            playerCols = screenCols;
        } else {
            playerCols = 18;
        }

        return {
            row: screenRows - playerRows,
            col: playerCols,
            height: playerRows * 32 + emptyVerticalSpace,
            width: playerCols * 32 - 2
        };
    };

    return {
        subscribe,
        setLayout
    };
};

export const layout = createLayoutStore();
