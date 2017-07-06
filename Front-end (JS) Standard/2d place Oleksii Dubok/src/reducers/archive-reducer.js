
export default function (state = [], action) {
    switch (action.type) {
        case 'ARCHIVE_ADD_TASK':
            return [...state, action.task];
        case 'ARCHIVE_REMOVE_TASK':
            return state.filter(task => task.id !== action.taskId);
        default:
            return state;
    }
}

