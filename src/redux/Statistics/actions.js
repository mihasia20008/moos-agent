import * as types from './actionTypes';
import { Statistics } from '../../services/api';

import { logoutProcess } from "../User/actions";
import { setErrorContent } from "../Error/actions";

export function fetchWidgetData() {
    return async dispatch => {
        try {
            dispatch({ type: types.WIDGET_STATS_FETCH });
            const { isSuccess, ...res } = await Statistics.getWidget();
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            const { result: items } = res;
            const sum = Object.keys(items).reduce((acc, key) => {
                return acc + items[key].count;
            }, 0);
            const noItems = !Object.keys(items).length;
            dispatch({ type: types.WIDGET_STATS_SUCCESS, data: { items, sum, noItems } });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.WIDGET_STATS_ERROR });
        }
    };
}

export function fetchPeriodsList() {
    return async dispatch => {
        try {
            dispatch({ type: types.PERIODS_LIST_FETCH });
            const { isSuccess, ...res } = await Statistics.getPeriods();
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
            }
            dispatch({ type: types.PERIODS_LIST_SUCCESS, data: { periods: res.periods } });
        } catch (err) {
            console.log(err);
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.PERIODS_LIST_ERROR });
        }
    }
}

export function fetchEmployeeStat(period, username) {
    return async dispatch => {
        try {
            dispatch({ type: types.EMPLOYEE_STATS_FETCH });
            const { isSuccess, ...res } = await Statistics.getEmployeeStats(period, username);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
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
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.EMPLOYEE_STATS_ERROR });
        }
    }
}

export function fetchCompanyStat(period) {
    return async dispatch => {
        try {
            dispatch({ type: types.COMPANY_STATS_FETCH });
            const { isSuccess, ...res } = await Statistics.getCompanyStats(period);
            if (!isSuccess) {
                if (res.needLogout) {
                    dispatch(logoutProcess(res.message));
                    return;
                }
                throw new Error(res.message);
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
            dispatch(setErrorContent(err.message));
            dispatch({ type: types.COMPANY_STATS_ERROR });
        }
    }
}