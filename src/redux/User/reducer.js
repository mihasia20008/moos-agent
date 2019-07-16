import * as types from './actionTypes';
import Cookies from 'js-cookie';

const initialState = {
    isFetching: false,
    isAuth: false,
    session_id: Cookies.get('session_id'),
    logout: false,
    username: '',
    fullname: '',
    isclient: null,
    isagent: null,
    processDefinitionKeys: [],
    companyEmployees: [],
    keycloak: {},
    settingsFetch: true,
    settings: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_FETCH:
        case types.LOGOUT_FETCH:
        case types.AUTH_FETCH: {
            return {
                ...state,
                isFetching: true,
                logout: false,
            };
        }
        case types.LOGIN_SUCCESS:
        case types.AUTH_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                isAuth: true,
                ...action.data,
            };
        }
        case types.LOGOUT_SUCCESS: {
            return {
                ...initialState,
                logout: true,
                session_id: '',
                settingsFetch: state.settingsFetch,
                settings: state.settings,
            };
        }
        case types.LOGIN_ERROR:
        case types.LOGOUT_ERROR:
        case types.AUTH_ERROR: {
            return {
                ...state,
                isFetching: false,
                session_id: '',
            };
        }
        case types.SET_KEYCLOAK: {
            const { keycloak } = action;
            return {
                ...state,
                keycloak
            };
        }
        case types.GET_SETTINGS_SUCCESS: {
            const { data } = action;
            return {
                ...state,
                settingsFetch: false,
                settings: data
            };
        }
        case types.GET_SETTINGS_ERROR: {
            return {
                ...state,
                settingsFetch: false,
            }
        }
        default: {
            return state;
        }
    }
}
