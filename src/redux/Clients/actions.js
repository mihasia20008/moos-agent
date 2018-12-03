import * as types from './actionTypes';
import { Clients } from '../../services/api';
import * as Tasks from "../../services/api/tasks";

export function getClientsList(session_id) {
    return async dispatch => {
        try {
            dispatch({ type: types.CLIENTS_FETCH });
            const { isSuccess, ...res } = await Clients.getData(session_id);
            if (!isSuccess) {
                alert(res.message);
                dispatch({ type: types.CLIENTS_ERROR });
                return;
            }
            res.idsList = Object.keys(res.list);
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
                alert(res.message);
                dispatch({ type: types.NEXT_CLIENTS_ERROR });
                return;
            }
            res.idsList = Object.keys(res.list);
            dispatch({ type: types.NEXT_CLIENTS_SUCCESS, data: res });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.NEXT_CLIENTS_ERROR });
        }
    }
}

