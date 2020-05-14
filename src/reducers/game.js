const defaultState = {
    lives: 3,
    score: 0,
    isStarted: false,
    scoreMultiplier: 1
};

const game = (state = defaultState, action) => {
    switch (action.type) {
        case 'GAME_START':
            return {
                ...state,
                isStarted: true,
            };
        case 'GAME_STOP':
            return {
                ...defaultState
            };
        case 'SCORE_INCREMENT':
            return {
                ...state,
                score: state.score + state.scoreMultiplier
            };
        case 'LOST_1_LIFE':
            return {
                ...state,
                lives: state.lives - 1
            };
        default:
            return state;
    }
};

export default game;
