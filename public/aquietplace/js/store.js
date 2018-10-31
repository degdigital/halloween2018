const initialState = {
    currentRoute: null,
    isGameScenePlaying: false,
    currentSeverity: 0
};

let state = {...initialState};

function getState() {
    return state;
}

function setState(newState) {
    state = {...state, ...newState};
}

const store = {
    getState,
    setState
}

export default store;