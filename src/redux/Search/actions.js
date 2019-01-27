import * as types from './actionTypes';
import { Search } from '../../services/api';

import { logoutProcess } from "../User/actions";

export function searchByString(session_id, query) {
    return async dispatch => {
        try {
            const { isSuccess, ...res } = await Search.findByString(session_id, query);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess());
                    return;
                }
                alert(res.message);
                dispatch({ type: types.SEARCH_ERROR });
                return;
            }
            console.log(res);
            // res.list = res.list.slice(0, 7);
            res.idsList = Object.keys(res.list).splice(0, 7);
            dispatch({ type: types.SEARCH_SUCCESS, data: res });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.SEARCH_ERROR });
        }
    };
}
