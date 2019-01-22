import * as types from './actionTypes';
import { Statistics } from '../../services/api';

export function fetchWidgetData(session_id) {
    return async dispatch => {
        try {
            dispatch({ type: types.WIDGET_STATS_FETCH });
            const { isSuccess, ...res } = await Statistics.getWidget(session_id);
            if (!isSuccess) {
                alert(res.message);
                dispatch({ type: types.WIDGET_STATS_ERROR });
                return;
            }
            const { result: items } = res;
            const sum = Object.keys(items).reduce((acc, key) => {
                return acc + items[key].count;
            }, 0);
            const noItems = !Object.keys(items).length;
            dispatch({ type: types.WIDGET_STATS_SUCCESS, data: { items, sum, noItems } });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.WIDGET_STATS_ERROR });
        }
    };
}

export function fetchPeriodsList(session_id) {
    return async dispatch => {
        try {
            dispatch({ type: types.PERIODS_LIST_FETCH });
            const { isSuccess, ...res } = await Statistics.getPeriods(session_id);
            if (!isSuccess) {
                alert(res.message);
                dispatch({ type: types.PERIODS_LIST_ERROR });
                return;
            }
            dispatch({ type: types.PERIODS_LIST_SUCCESS, data: { periods: res.periods } });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.PERIODS_LIST_ERROR });
        }
    }
}

export function fetchEmployeeStat(session_id, period, username) {
    return async dispatch => {
        try {
            dispatch({ type: types.EMPLOYEE_STATS_FETCH });
            const { isSuccess, ...res } = await Statistics.getEmployeeStats(session_id, period, username);
            if (!isSuccess) {
                alert(res.message);
                dispatch({ type: types.EMPLOYEE_STATS_ERROR });
                return;
            }
            const { result: items } = res;
            let countSum = 0;
            let amountSum = 0;
            Object.keys(items).forEach((key) => {
                countSum += items[key].count;
                amountSum += items[key].amount;
            });
            amountSum = parseFloat(amountSum.toFixed(2));
            const noItems = !Object.keys(items).length;
            dispatch({ type: types.EMPLOYEE_STATS_SUCCESS, data: { items, countSum, amountSum, noItems } });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.EMPLOYEE_STATS_ERROR });
        }
    }
}

export function fetchCompanyStat(session_id, period) {
    return async dispatch => {
        try {
            dispatch({ type: types.COMPANY_STATS_FETCH });
            const { isSuccess, ...res } = await Statistics.getCompanyStats(session_id, period);
            if (!isSuccess) {
                alert(res.message);
                dispatch({ type: types.COMPANY_STATS_ERROR });
                return;
            }
            const { result: items } = res;
            let countSum = 0;
            let amountSum = 0;
            Object.keys(items).forEach((key) => {
                countSum += items[key].count;
                amountSum += items[key].amount;
            });
            amountSum = parseFloat(amountSum.toFixed(2));
            const noItems = !Object.keys(items).length;
            dispatch({ type: types.COMPANY_STATS_SUCCESS, data: { items, countSum, amountSum, noItems } });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.COMPANY_STATS_ERROR });
        }
    }
}