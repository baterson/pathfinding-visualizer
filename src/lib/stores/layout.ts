import { writable } from 'svelte/store';

const INITIAL_STATE = {
    screen: { row: 0, col: 0 },
    isCalculating: true
};

// Screen layout representation to the Grid rows/columns
const createLayoutStore = () => {
    const { subscribe, update } = writable(INITIAL_STATE);

    const setLayout = () => {
        const navHeight = 63;
        let playerRows = 5;
        const screenWidth = window.innerWidth;

        if (screenWidth >= 1024) {
            playerRows = 3
        }

        const screenHeight = window.innerHeight - navHeight - playerRows * 32;
        const screenCols = Math.round(screenWidth / 32);
        const screenRows = Math.round(screenHeight / 32);


        update((current) => {
            console.log('Hello?');

            current.screen.row = screenRows;
            current.screen.col = screenCols;
            current.isCalculating = false;
            return current;
        });
    };

    const setCalculating = () => {
        console.log('sin set');

        return update((current) => {
            current.isCalculating = true
            return current
        })
    }

    return {
        subscribe,
        setCalculating,
        setLayout
    };
};

export const layout = createLayoutStore();
