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
    addUser: {
        fetching: false,
        status: false,
    },
    editUser: {
        fetching: false,
        status: false,
    }
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
                addUser: { ...state.addUser, fetching: true },
            };
        }
        case types.AGENT_USER_ADD_SUCCESS: {
            return {
                ...state,
                addUser: { ...state.addUser, fetching: false, status: true },
            };
        }
        case types.AGENT_USER_ADD_ERROR: {
            return {
                ...state,
                addUser: { ...state.addUser, fetching: false },
            };
        }
        case types.AGENT_USER_ADD_RESET: {
            return {
                ...state,
                addUser: { ...initialState.addUser },
            };
        }
        case types.AGENT_USER_EDIT_FETCH: {
            return {
                ...state,
                editUser: { ...state.editUser, fetching: true },
            };
        }
        case types.AGENT_USER_EDIT_SUCCESS: {
            return {
                ...state,
                editUser: { ...state.editUser, fetching: false, status: true },
            };
        }
        case types.AGENT_USER_EDIT_ERROR: {
            return {
                ...state,
                editUser: { ...state.editUser, fetching: false },
            };
        }
        case types.AGENT_USER_EDIT_RESET: {
            return {
                ...state,
                editUser: { ...initialState.editUser },
            };
        }
        default: {
            return state;
        }
    }
};
