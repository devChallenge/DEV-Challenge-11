import uuid from 'uuid';
import throttle from 'lodash.throttle';
import { saveState } from '../utils/localStorageUtils.js';

export const CREATE_TASK = 'CREATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';

export function createTask(taskParams) {
    const task = {
        id: uuid.v4(),
        ...taskParams
    };

    return (dispatch, getState) => {
        dispatch({
            type: CREATE_TASK,
            task
        });
        throttledSaveState(getState());
    };
}

export function deleteTask(task) {
    return (dispatch, getState) => {
        dispatch({
            type: DELETE_TASK,
            id  : task.id
        });
        throttledSaveState(getState());
    };
}

export function updateTask(id, params) {
    const newTask = {
        id,
        ...params
    };

    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_TASK,
            task: newTask
        });
        throttledSaveState(getState());
    };
}

export const throttledSaveState = throttle(state => {
    saveState(state);
    console.log('state saved');
}, 2000);

