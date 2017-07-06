const stateID = 'DevChallenge_final-state';

export function loadState() {
    try {
        const serializedData = localStorage.getItem(stateID);

        if (serializedData === null) return undefined;

        return JSON.parse(serializedData);
    } catch (err) {
        return undefined;
    }
}

export function saveState(store) {
    try {
        const state = {
            tasks     : store.tasks,
            columns   : store.columns,
            categories: store.categories,
            archive   : store.archive
        };
        const serializedData = JSON.stringify(state);

        localStorage.setItem(stateID, serializedData);
    } catch (err) {
        // some error handlers
        console.error(err);
    }
}
