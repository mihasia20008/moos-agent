import * as types from './actionTypes';

import { User } from '../../services/api';
import Cookies from 'js-cookie';

export function loginUser(username, password) {
    return async dispatch => {
        try {
            dispatch({ type: types.LOGIN_FETCH });
            const res = await User.login({ username, password });
            if (!res.isSuccess) {
                alert(res.message);
                dispatch({ type: types.LOGIN_ERROR });
                return;
            }
            Cookies.set('session_id', res.session.session_id, { expires: 1 });
            Cookies.set('JSESSIONID', res.session.JSESSIONID, { expires: 1 });
            dispatch({ type: types.LOGIN_SUCCESS, data: Object.assign(
                {},
                { ...res.user },
                { processDefinitionKeys: res.process_definition_keys },
            ) });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.LOGIN_ERROR });
        }
    };
}

export function authenticationUser() {
    return async dispatch => {
        try {
            dispatch({ type: types.AUTH_FETCH });
            const res = await User.auth();
            if (!res.isSuccess) {
                Cookies.remove('session_id');
                Cookies.remove('JSESSIONID');
                dispatch({ type: types.AUTH_ERROR });
                return;
            }
            Cookies.set('session_id', res.session.session_id, { expires: 1 });
            Cookies.set('JSESSIONID', res.session.JSESSIONID, { expires: 1 });
            dispatch({ type: types.AUTH_SUCCESS, data: Object.assign(
                {},
                { ...res.user },
                { processDefinitionKeys: res.process_definition_keys },
            ) });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.AUTH_ERROR })
        }
    }
}

export function logoutUser() {
    return async dispatch => {
        try {
            dispatch({ type: types.LOGOUT_FETCH });
            const res = await User.logout();
            if (!res.isSuccess) {
                alert(res.message);
                dispatch({ type: types.LOGOUT_ERROR });
                return;
            }
            Cookies.remove('session_id');
            Cookies.remove('JSESSIONID');
            dispatch({ type: types.LOGOUT_SUCCESS });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.LOGOUT_ERROR });
        }
    };
}