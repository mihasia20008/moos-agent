import * as types from './actionTypes';

import { User } from '../../services/api';
import Cookies from 'js-cookie';

import { setErrorContent } from "../Error/actions";

export function logoutProcess(message = '') {
    return dispatch => {
        if (message) {
            dispatch(setErrorContent(message));
        }
        Cookies.remove('session_id');
        Cookies.remove('JSESSIONID');
        dispatch({type: types.LOGOUT_SUCCESS});
    };
}

export function loginUser(username, password) {
    return async dispatch => {
        try {
            dispatch({ type: types.LOGIN_FETCH });
            const { isSuccess, ...res } = await User.login({ username, password });
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            Cookies.set('session_id', res.session.session_id, { expires: 1 });
            Cookies.set('JSESSIONID', res.session.JSESSIONID, { expires: 1 });
            dispatch({
                type: types.LOGIN_SUCCESS,
                data: Object.assign(
                    {},
                    { ...res.user },
                    { 
                        processDefinitionKeys: res.process_definition_keys,
                        session_id: res.session.session_id,
                    },
                    {
                        companyEmployees: res.company.agentLogins || [],
                    },
                ),
            });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.LOGIN_ERROR });
        }
    };
}

export function authenticationUser(needNotification) {
    return async dispatch => {
        try {
            dispatch({ type: types.AUTH_FETCH });
            const { isSuccess, ...res} = await User.auth();
            if (!isSuccess) {
                dispatch(logoutProcess(needNotification ? res.message : undefined));
                dispatch({ type: types.AUTH_ERROR });
                return;
            }
            Cookies.set('session_id', res.session.session_id, { expires: 1 });
            Cookies.set('JSESSIONID', res.session.JSESSIONID, { expires: 1 });
            dispatch({ type: types.AUTH_SUCCESS, data: Object.assign(
                {},
                { ...res.user },
                {
                    processDefinitionKeys: res.process_definition_keys,
                    session_id: res.session.session_id,
                },
                {
                    companyEmployees: res.company.agentLogins || [],
                },
            ) });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.AUTH_ERROR })
        }
    }
}

export function logoutUser() {
    return async dispatch => {
        try {
            dispatch({ type: types.LOGOUT_FETCH });
            const { isSuccess, ...res } = await User.logout();
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            dispatch(logoutProcess());
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.LOGOUT_ERROR });
        }
    };
}
