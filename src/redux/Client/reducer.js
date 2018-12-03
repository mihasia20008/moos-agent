import * as types from './actionTypes';

const initialState = {
    isFetching: false,
    company: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CLIENT_FETCH: {
            return { ...state, isFetching: true };
        }
        case types.CLIENT_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                ...action.data,
            };
        }
        case types.CLIENT_ERROR: {
            return { ...state, isFetching: false };
        }
        case types.CLIENT_CLEAR: {
            return { ...state, company: {} };
        }
        default: {
            return { ...state };
        }
    }
};
