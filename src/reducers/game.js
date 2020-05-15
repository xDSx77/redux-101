const defaultState = {
    lives: 3,
    score: 0,
    isStarted: false,
    scoreMultiplier: 1,
    kills: 0,
    killSpree: 0
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
                score: state.score + state.scoreMultiplier,
                kills: state.kills + 1,
                killSpree: state.killSpree + 1,
                scoreMultiplier: 2**(Math.floor((state.killSpree + 1)/3))
            };
        case 'LOST_LIVES':
            return {
                ...state,
                lives: state.lives - action.value,
                scoreMultiplier: action.value ? 1 : state.scoreMultiplier,
                killSpree: action.value ? 0 : state.killSpree
            };
        default:
            return state;
    }
};

export default game;
