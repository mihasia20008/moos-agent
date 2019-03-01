import * as types from './actionTypes';

const initialState = {
    isFetching: false,
    isUsersFetching: false,
    agents: [],
    users: [],
    changingUser: '',
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
        case types.AGENT_USER_CHANGE_STATUS_FETCH: {
            return { ...state, changingUser: action.user };
        }
        case types.AGENT_USER_CHANGE_STATUS_SUCCESS: {
            const updatedUsers = state.users.map(user => {
                return user.username !== state.changingUser
                    ? user
                    : Object.assign({}, user, { enabled: !user.enabled });
            });
            return {
                ...state,
                changingUser: '',
                users: [...updatedUsers]
            };
        }
        case types.AGENT_USER_CHANGE_STATUS_ERROR: {
            return {
                ...state,
                changingUser: '',
            };
        }
        default: {
            return state;
        }
    }
};
