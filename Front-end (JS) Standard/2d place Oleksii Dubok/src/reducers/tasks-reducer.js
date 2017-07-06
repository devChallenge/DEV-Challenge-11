import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from '../actions/task';


export default function (state = [], action) {
    switch (action.type) {
        case CREATE_TASK:
            return [...state, action.task];
        case DELETE_TASK:
            return state.filter(task => task.id !== action.id);
        case UPDATE_TASK:
            return [...state.filter(task => task.id !== action.task.id),
                action.task
            ];

        default:
            return state;
    }
}
