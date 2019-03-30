import * as types from './actionTypes';

const initialState = {
    isFetching: false,
    wasFetching: false,
    getUsersFetching: false,
    addUserFetching: false,
    addUserStatus: false,
    ids: [],
    list: {},
    rootAgents: [],
    agents: [],
    stat: {},
    users: [],
    changingUser: '',
    addAgent: {
        fetching: false,
        status: false,
    },
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
            return { ...state, isFetching: true, wasFetching: false };
        }
        case types.AGENTS_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                wasFetching: true,
                ...action.data,
            };
        }
        case types.AGENTS_ERROR: {
            return { ...state, isFetching: false, wasFetching: true };
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
        case types.AGENT_SUB_NEW_FETCH: {
            return {
                ...state,
                addAgent: { ...state.addAgent, fetching: true },
            };
        }
        case types.AGENT_SUB_NEW_SUCCESS: {
            return {
                ...state,
                addAgent: { ...state.addAgent, fetching: false, status: true },
            };
        }
        case types.AGENT_SUB_NEW_ERROR: {
            return {
                ...state,
                addAgent: { ...state.addAgent, fetching: false },
            };
        }
        case types.AGENT_SUB_NEW_RESET: {
            return {
                ...state,
                addAgent: { ...initialState.addAgent },
            };
        }
        default: {
            return state;
        }
    }
};
