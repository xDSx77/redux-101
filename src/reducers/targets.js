let TARGET_IDS = 0;

const defaultState = [{
    id: TARGET_IDS++,
    x: 50,
    y: 50,
    value: 3
}];

const target = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TARGETS':
            return {
                ...state,
                value : state.value - 1
            };
        default:
            return state;
    }
};

const targets = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_TARGET':
            return [...state, {id: TARGET_IDS++, x: Math.ceil(Math.random()*99), y: Math.ceil(Math.random()*89+10), value: 3}];

        case 'UPDATE_TARGETS':
            return state.map(t => target(t, action));

        case 'CHECK_TARGETS':
            return state.filter(t => t.value > 0);

        case 'DELETE_TARGET':
            return state.filter(t => t.id !== action.id);

        case 'CLEAN_TARGET':
            return defaultState;

        default:
            return state;
    }
};

export default targets;
