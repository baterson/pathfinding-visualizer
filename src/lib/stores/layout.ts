import { writable } from 'svelte/store';
import { tick } from 'svelte';

const INITIAL_STATE = {
    screen: { row: 0, col: 0 },
    isCalculating: true
};

const createLayoutStore = () => {
    const { subscribe, update } = writable(INITIAL_STATE);

    const setLayout = () => {
        const NavHeight = 63;
        let playerRows = 5;
        const screenWidth = window.innerWidth;

        if (screenWidth >= 1024) {
            playerRows = 3
        }

        const screenHeight = window.innerHeight - NavHeight - playerRows * 32;
        const screenCols = Math.round(screenWidth / 32);
        const screenRows = Math.round(screenHeight / 32);


        update((current) => {
            current.screen.row = screenRows;
            current.screen.col = screenCols;
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

    return {
        subscribe,
        setLayout
    };
};

export const layout = createLayoutStore();
