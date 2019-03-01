import * as types from './actionTypes';
import { Agents } from '../../services/api';

import { logoutProcess } from "../User/actions";
import { setErrorContent } from "../Error/actions";

export function getAgentsList(session_id) {
    return async dispatch => {
        try {
            dispatch({ type: types.AGENTS_FETCH });
            const { isSuccess, ...res } = await Agents.getData(session_id);
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

export function getAgentUsersList(session_id, companyId) {
    return async dispatch => {
        try {
            dispatch({ type: types.AGENT_USERS_FETCH });
            const { isSuccess, ...res } = await Agents.getUsersList(session_id, companyId);
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

export function setUserEnable(session_id, username) {
    return async dispatch => {
        try {
            dispatch({ type: types.AGENT_USER_CHANGE_STATUS_FETCH, user: username });
            const { isSuccess, ...res } = await Agents.setEnableStatus(session_id, username);
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

export function setUserDisable(session_id, username) {
    return async dispatch => {
        try {
            dispatch({ type: types.AGENT_USER_CHANGE_STATUS_FETCH, user: username });
            const { isSuccess, ...res } = await Agents.setDisableStatus(session_id, username);
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