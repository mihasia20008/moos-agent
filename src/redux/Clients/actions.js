import * as types from './actionTypes';
import { Clients } from '../../services/api';

import { logoutProcess } from "../User/actions";
import { setErrorContent } from "../Error/actions";

export function getClientsList(session_id, filters) {
    return async dispatch => {
        try {
            dispatch({ type: types.CLIENTS_FETCH });
            const { isSuccess, ...res } = await Clients.getData(session_id, filters);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            dispatch({ type: types.CLIENTS_SUCCESS, data: res });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.CLIENTS_ERROR });
        }
    };
}

export function getNextClientsList(session_id, page, filters) {
    return async dispatch => {
        try {
            dispatch({ type: types.NEXT_CLIENTS_FETCH });
            const { isSuccess, ...res } = await Clients.getNextPage(session_id, page, filters);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            dispatch({ type: types.NEXT_CLIENTS_SUCCESS, data: res });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.NEXT_CLIENTS_ERROR });
        }
    }
}

export function setClientsFilter(filters) {
    return dispatch => dispatch({ type: types.CLIENTS_SET_FILTER, data: { filters }});
}

export function clearAllFilters() {
    return dispatch => dispatch({ type: types.CLIENTS_CLEAR_FILTERS });
}
