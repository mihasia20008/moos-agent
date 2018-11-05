import * as types from './actionTypes';
import { Tasks } from '../../services/api';

export function getTasksList() {
    return async dispatch => {
        try {
            dispatch({ type: types.TASKS_FETCH });
            const res = await Tasks.getData();
            if (!res.isSuccess) {
                dispatch({ type: types.TASKS_ERROR, text: res.text });
                return;
            }
            dispatch({ type: types.TASKS_SUCCESS, data: res.data });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.TASKS_ERROR });
        }
    };
}
