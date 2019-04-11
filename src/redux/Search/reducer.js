import * as types from './actionTypes';

const initialState = {
    list: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_SUCCESS: {
            return {
                ...state,
                list: action.result,
            };
        }
        case types.SEARCH_CLEAR: {
            return { ...initialState };
        }
        case types.SEARCH_ERROR:
        default: {
            return state;
        }
    }
};
