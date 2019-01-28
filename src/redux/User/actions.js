import * as types from './actionTypes';

import { User } from '../../services/api';
import Cookies from 'js-cookie';

import { setErrorContent } from "../Error/actions";

export function logoutProcess() {
    return dispatch => {
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
                    dispatch(logoutProcess());
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

export function authenticationUser(session_id) {
    return async dispatch => {
        try {
            dispatch({ type: types.AUTH_FETCH });
            const { isSuccess, ...res} = await User.auth(session_id);
            if (!isSuccess) {
                dispatch(logoutProcess());
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

export function logoutUser(session_id) {
    return async dispatch => {
        try {
            dispatch({ type: types.LOGOUT_FETCH });
            const { isSuccess, ...res } = await User.logout(session_id);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess());
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