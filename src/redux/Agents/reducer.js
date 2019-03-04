import * as types from './actionTypes';

const initialState = {
    isFetching: true,
    getUsersFetching: false,
    addUserFetching: false,
    addUserStatus: false,
    agents: [],
    stat: {},
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
                getUsersFetching: true,
                users: [],
            };
        }
        case types.AGENT_USERS_SUCCESS: {
            return {
                ...state,
                getUsersFetching: false,
                ...action.data,
            }
        }
        case types.AGENT_USERS_ERROR: {
            return { ...state, getUsersFetching: false };
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
        case types.AGENT_USER_ADD_FETCH: {
            return {
                ...state,
                addUserFetching: true,
            };
        }
        case types.AGENT_USER_ADD_SUCCESS: {
            return {
                ...state,
                addUserFetching: false,
                addUserStatus: true,
            };
        }
        case types.AGENT_USER_ADD_ERROR: {
            return {
                ...state,
                addUserFetching: false,
            };
        }
        case types.AGENT_USER_ADD_RESET: {
            return {
                ...state,
                addUserFetching: false,
                addUserStatus: false,
            };
        }
        default: {
            return state;
        }
    }
};
