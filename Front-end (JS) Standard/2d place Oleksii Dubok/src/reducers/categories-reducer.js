const defaultState = [
    {
        id   : 'frontend',
        name : 'UI/Front-End',
        color: 'tomato'
    },
    {
        id   : 'backend',
        name : 'Backend',
        color: 'steelblue'
    }
];

export default function (state = defaultState, action) {
    switch (action.type) {
        case 'ADD_CATEGORY':
            return [...state, action.category];
        case 'REMOVE_CATEGORY':
            return state.filter(category => category.id !== action.categoryId);
        case 'CHANGE_CATEGORY':
            return [
                ...state.filter(category => category.id !== action.categoryId),
                action.category
            ];
        default:
            return state;
    }
}

