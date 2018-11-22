import * as types from './actionTypes';

const initialState = {
    idsList: [],
    list: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_SUCCESS: {
            return {
                ...state,
                ...action.data,
            };
        }
        case types.SEARCH_ERROR:
        default: {
            return { ...state };
        }
    }
};
