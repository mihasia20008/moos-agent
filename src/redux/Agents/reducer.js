import * as types from './actionTypes';

const initialState = {
    isFetching: false,
    agents: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.AGENTS_FETCH: {
            return { ...state, isFetching: true };
        }
        case types.AGENTS_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                ...action.data,
            };
        }
        case types.AGENTS_ERROR: {
            return { ...state, isFetching: false };
        }
        default: {
            return state;
        }
    }
};
