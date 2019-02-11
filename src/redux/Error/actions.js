import * as types from './actionTypes';

export function setErrorContent(message) {
    return dispatch => dispatch({ type: types.ERROR_SHOW, message });
}

export function clearErrorContent() {
    return dispatch => dispatch({ type: types.ERROR_HIDE });
}
