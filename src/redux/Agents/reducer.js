import * as types from './actionTypes';

const initialState = {
    isFetching: false,
    isUsersFetching: false,
    agents: [],
    users: [],
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
        case types.AGENT_USERS_FETCH: {
            return {
                ...state,
                isUsersFetching: true,
                users: [],
            };
        }
        case types.AGENT_USERS_SUCCESS: {
            return {
                ...state,
                isUsersFetching: false,
                ...action.data,
            }
        }
        case types.AGENT_USERS_ERROR: {
            return { ...state, isUsersFetching: false };
        }
        default: {
            return state;
        }
    }
};
