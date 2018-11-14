import * as types from './actionTypes';
import Cookies from 'js-cookie';

const initialState = {
  isFetching: false,
  isAuth: false,
  session_id: Cookies.get('session_id'),
  username: '',
  fullname: '',
  isclient: null,
  isagent: null,
  processDefinitionKeys: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_FETCH:
        case types.LOGOUT_FETCH:
        case types.AUTH_FETCH: {
            return {
                ...state,
                isFetching: true,
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
            return { ...initialState };
        }
        case types.LOGIN_ERROR:
        case types.LOGOUT_ERROR:
        case types.AUTH_ERROR: {
            return {
                ...state,
                isFetching: false,
            };
        }
        default: {
            return { ...state };
        }
    }
}