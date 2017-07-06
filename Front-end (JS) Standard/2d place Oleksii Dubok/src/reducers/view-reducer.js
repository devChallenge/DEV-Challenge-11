import { SET_EDITING_STATUS, SEARCH_BY_NAME, EDIT_TASK } from '../actions/view';

const defaultState =    {
    searchQuery  : '',
    dragging     : null,
    editingStatus: '',
    editingTask  : {
        name       : '',
        description: '',
        status     : 'todo'
    }
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case 'DRAG_TASK':
            return { ...state, dragging: action.id };
        case SET_EDITING_STATUS :
            return { ...state, editingStatus: action.item };
        case SEARCH_BY_NAME :
            return { ...state, searchQuery: action.query };
        case EDIT_TASK :
            return { ...state, editingTask: action.task };
        default:
            return state;
    }
}
