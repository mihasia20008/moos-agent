import * as types from './actionTypes';
import { Agents } from '../../services/api';

import { logoutProcess } from "../User/actions";
import { setErrorContent } from "../Error/actions";

export function getAgentsList() {
    return async dispatch => {
        try {
            dispatch({ type: types.AGENTS_FETCH });
            const { isSuccess, ...res } = await Agents.getData();
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            dispatch({ type: types.AGENTS_SUCCESS, data: res });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.AGENTS_ERROR });
        }
    };
}

export function getAgentUsersList(companyId) {
    return async dispatch => {
        try {
            dispatch({ type: types.AGENT_USERS_FETCH });
            const { isSuccess, ...res } = await Agents.getUsersList(companyId);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            dispatch({ type: types.AGENT_USERS_SUCCESS, data: { users: res.user } });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.AGENT_USERS_ERROR });
        }
    };
}

export function setUserEnable(username) {
    return async dispatch => {
        try {
            dispatch({ type: types.AGENT_USER_CHANGE_STATUS_FETCH, user: username });
            const { isSuccess, ...res } = await Agents.changeUserStatus.setEnable(username);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            dispatch({ type: types.AGENT_USER_CHANGE_STATUS_SUCCESS });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.AGENT_USER_CHANGE_STATUS_ERROR });
        }
    };
}

export function setUserDisable(username) {
    return async dispatch => {
        try {
            dispatch({ type: types.AGENT_USER_CHANGE_STATUS_FETCH, user: username });
            const { isSuccess, ...res } = await Agents.changeUserStatus.setDisable(username);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            dispatch({ type: types.AGENT_USER_CHANGE_STATUS_SUCCESS });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.AGENT_USER_CHANGE_STATUS_ERROR });
        }
    };
}

export function addUser({ name, ismanager, ...restData }) {
    return async dispatch => {
        try {
            dispatch({ type: types.AGENT_USER_ADD_FETCH });
            const names = name.split(' ');
            const data = Object.assign({}, restData, {
                lastName: names[0],
                firstName: names[1],
                ismanager: +ismanager,
            });
            const { isSuccess, ...res } = await Agents.createUser(data);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            dispatch({ type: types.AGENT_USER_ADD_SUCCESS });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.AGENT_USER_ADD_ERROR });
        }
    };
}

export function resetAddingUserStatus() {
    return dispatch => dispatch({ type: types.AGENT_USER_ADD_RESET })
}

export function editUser({ name, ismanager, ...restData }) {
    return async dispatch => {
        try {
            dispatch({ type: types.AGENT_USER_EDIT_FETCH });
            const names = name.split(' ');
            const data = Object.assign({}, restData, {
                lastName: names[0],
                firstName: names[1],
                ismanager: +ismanager,
            });
            const { isSuccess, ...res } = await Agents.editUser(data);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            dispatch({ type: types.AGENT_USER_EDIT_SUCCESS });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.AGENT_USER_EDIT_ERROR });
        }
    };
}

export function resetEditingUserStatus() {
    return dispatch => dispatch({ type: types.AGENT_USER_EDIT_RESET })
}

export function addSubagent(data) {
    return async dispatch => {
        try {
            dispatch({ type: types.AGENT_SUB_NEW_FETCH });
            const { isSuccess, ...res } = await Agents.createSubagent(data);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            dispatch({ type: types.AGENT_SUB_NEW_SUCCESS });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.AGENT_SUB_NEW_ERROR });
        }
    };
}

export function resetAddingSubagentStatus() {
    return dispatch => dispatch({ type: types.AGENT_SUB_NEW_RESET })
}
