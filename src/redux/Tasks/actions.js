import * as types from './actionTypes';
import { Tasks } from '../../services/api';

export function getTasksList(session_id) {
    return async dispatch => {
        try {
            dispatch({ type: types.TASKS_FETCH });
            const res = await Tasks.getData(session_id);
            if (!res.isSuccess) {
                alert(res.message);
                dispatch({ type: types.TASKS_ERROR });
                return;
            }
            dispatch({ type: types.TASKS_SUCCESS, data: res });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.TASKS_ERROR });
        }
    };
}

export function getNextTasksPage() {
    return async dispatch => {
        try {
            dispatch({ type: types.NEXT_TASKS_FETCH });
            const res = await Tasks.getNextPage();
            if (!res.isSuccess) {
                dispatch({ type: types.NEXT_TASKS_ERROR, text: res.text });
                return;
            }
            dispatch({ type: types.NEXT_TASKS_SUCCESS, data: res.data });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.NEXT_TASKS_ERROR });
        }
    }
}