import * as types from './actionTypes';
import { Search } from '../../services/api';

import { logoutProcess } from "../User/actions";
import { setErrorContent } from "../Error/actions";

export function searchByString(session_id, query) {
    return async dispatch => {
        try {
            const { isSuccess, ...res } = await Search.findByString(session_id, query);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            dispatch({
                type: types.SEARCH_SUCCESS,
                result: res.company ? res.company.slice(0, 7) : []
            });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.SEARCH_ERROR });
        }
    };
}
