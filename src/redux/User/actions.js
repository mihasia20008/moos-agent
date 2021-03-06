import axios from "axios";
import * as types from './actionTypes';

import { User } from '../../services/api';
import Cookies from 'js-cookie';

import { setErrorContent } from "../Error/actions";

export function logoutProcess(message = '') {
    return (dispatch, getState) => {
        const { settings: { authType }, keycloak } = getState().User;

        if (authType === 'keycloak' && Object.keys(keycloak).length) {
            if (keycloak.authenticated) {
                keycloak.logout();
                Cookies.remove('JWT');
            }
        }
        if (authType === 'standard') {
            Cookies.remove('session_id');
            Cookies.remove('JSESSIONID');
        }

        if (message) {
            dispatch(setErrorContent(message));
        }

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
                dispatch(logoutProcess(needNotification ? res.message : ''));
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

export function setKeycloak(keycloak) {
    return dispatch => dispatch({ type: types.SET_KEYCLOAK, keycloak});
}

export function logoutUser(authType) {
    return async dispatch => {
        try {
            dispatch({ type: types.LOGOUT_FETCH });
            if (authType === 'standard') {
                const { isSuccess, ...res } = await User.logout();
                if (!isSuccess) {
                    if (res.needLogout) {
                        dispatch(logoutProcess(res.message));
                        return;
                    }
                    throw new Error(res.message);
                }
            }
            dispatch(logoutProcess());
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.LOGOUT_ERROR });
        }
    };
}

export function getAppSettings() {
    return async dispatch => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: '/contentConstants.json',
            });
            dispatch({ type: types.GET_SETTINGS_SUCCESS, data });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.GET_SETTINGS_ERROR });
        }
    }
}
