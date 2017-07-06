export const SET_EDITING_STATUS = 'SET_EDITING_STATUS';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const EDIT_TASK = 'EDIT_TASK';

export function setEditingStatus(item) {
    return {
        type: SET_EDITING_STATUS,
        item
    };
}

export function editTask(task) {
    return {
        type: EDIT_TASK,
        task
    };
}

export function searchByName(query) {
    return {
        type: SEARCH_BY_NAME,
        query
    };
}
