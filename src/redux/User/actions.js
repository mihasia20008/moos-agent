import * as types from './actionTypes';

import { User } from '../../services/api';

export function loginUser(name, password) {
    return async dispatch => {
        try {
            dispatch({ type: types.USER_FETCH });
            const res = User.loginUser({ name, password });
            if (!res.isSuccess) {
                alert('Ошибка');
                dispatch({ type: types.USER_ERROR });
            }
        } catch (err) {
            console.log(err);
            dispatch({ type: types.USER_ERROR });
        }
    };
}