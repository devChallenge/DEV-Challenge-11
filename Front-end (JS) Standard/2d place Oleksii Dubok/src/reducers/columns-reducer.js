import { CREATE_COLUMN } from '../actions/columns';

const defaultState = [
    {
        id  : 'todo',
        name: 'todo'
    },
    {
        id  : 'doing',
        name: 'doing'
    },
    {
        id  : 'done',
        name: 'done'
    }
];

export default function (state = defaultState, action) {
    switch (action.type) {
        case CREATE_COLUMN:
            return [...state, action.column];
        default:
            return state;
    }
}
