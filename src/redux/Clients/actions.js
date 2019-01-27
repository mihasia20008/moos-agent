import * as types from './actionTypes';
import { Clients } from '../../services/api';

import { logoutProcess } from "../User/actions";

export function getClientsList(session_id) {
    return async dispatch => {
        try {
            dispatch({ type: types.CLIENTS_FETCH });
            const { isSuccess, ...res } = await Clients.getData(session_id);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess());
                    return;
                }
                alert(res.message);
                dispatch({ type: types.CLIENTS_ERROR });
                return;
            }
            dispatch({ type: types.CLIENTS_SUCCESS, data: res });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.CLIENTS_ERROR });
        }
    };
}

export function getNextClientsList(session_id, page) {
    return async dispatch => {
        try {
            dispatch({ type: types.NEXT_CLIENTS_FETCH });
            const { isSuccess, ...res } = await Clients.getNextPage(session_id, page);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess());
                    return;
                }
                alert(res.message);
                dispatch({ type: types.NEXT_CLIENTS_ERROR });
                return;
            }
            dispatch({ type: types.NEXT_CLIENTS_SUCCESS, data: res });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.NEXT_CLIENTS_ERROR });
        }
    }
}

