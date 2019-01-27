import * as types from './actionTypes';
import { Client } from '../../services/api';

import { logoutProcess } from "../User/actions";
import { setErrorContent } from "../Error/actions";

export function getClientItem(session_id, id) {
    return async dispatch => {
        try {
            dispatch({ type: types.CLIENT_FETCH });
            const { isSuccess, ...res } = await Client.getData(session_id, id);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess());
                    return;
                }
                throw new Error(res.message);
            }
            dispatch({ type: types.CLIENT_SUCCESS, data: res });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.CLIENT_ERROR });
        }
    };
}

export function clearClient() {
    return dispatch => dispatch({ type: types.CLIENT_CLEAR });
}
