import * as types from './actionTypes';
import { Tasks } from '../../services/api';

const prepareTasksList = orderList => orderList.reduce((acc, { tasks }) => {
    if (!tasks) {
        return acc;
    }
    return Object.assign(acc, { [`${tasks[0].task_id}`]: tasks[0].name });
}, {});

export function getTasksList(session_id) {
    return async dispatch => {
        try {
            dispatch({ type: types.TASKS_FETCH });
            const { isSuccess, ...res } = await Tasks.getData(session_id);
            if (!isSuccess) {
                alert(res.message);
                dispatch({ type: types.TASKS_ERROR });
                return;
            }
            res.tasks = prepareTasksList(res.order);
            dispatch({ type: types.TASKS_SUCCESS, data: res });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.TASKS_ERROR });
        }
    };
}

export function getNextTasksPage(session_id, page) {
    return async dispatch => {
        try {
            dispatch({ type: types.NEXT_TASKS_FETCH });
            const { isSuccess, ...res } = await Tasks.getNextPage(session_id, page);
            if (!isSuccess) {
                alert(res.message);
                dispatch({ type: types.NEXT_TASKS_ERROR });
                return;
            }
            res.tasks = prepareTasksList(res.order);
            dispatch({ type: types.NEXT_TASKS_SUCCESS, data: res });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.NEXT_TASKS_ERROR });
        }
    }
}