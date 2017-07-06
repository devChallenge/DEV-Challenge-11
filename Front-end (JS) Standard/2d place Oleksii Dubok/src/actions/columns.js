import uuid from 'uuid';
import throttledSaveState from '../actions/task';

export const CREATE_COLUMN = 'CREATE_COLUMN';

export function createColumn(col) {
    const column = {
        id  : uuid.v4(),
        name: col.name
    };

    return (dispatch, getState) => {
        dispatch({
            type: CREATE_COLUMN,
            column
        });
        throttledSaveState(getState());
    };
}
