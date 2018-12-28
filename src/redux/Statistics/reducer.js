import * as types from './actionTypes';

const initialState = {
    isFetching: false,
    widget: {
        sum: null,
        items: {},
        noItems: true,
    },
    periods: [],
    employee: {
        countSum: null,
        amountSum: null,
        items: {},
        noItems: true,
    },
    company: {
        countSum: null,
        amountSum: null,
        items: {},
        noItems: true,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.PERIODS_LIST_FETCH:
        case types.COMPANY_STATS_FETCH:
        case types.EMPLOYEE_STATS_FETCH:
        case types.WIDGET_STATS_FETCH: {
            return { ...state, isFetching: true };
        }
        case types.WIDGET_STATS_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                widget: { ...state.widget, ...action.data },
            };
        }
        case types.PERIODS_LIST_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                ...action.data,
            };
        }
        case types.EMPLOYEE_STATS_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                employee: { ...state.employee, ...action.data },
            };
        }
        case types.COMPANY_STATS_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                company: { ...state.company, ...action.data },
            };
        }
        case types.PERIODS_LIST_ERROR:
        case types.COMPANY_STATS_ERROR:
        case types.EMPLOYEE_STATS_ERROR:
        case types.WIDGET_STATS_ERROR: {
            return { ...state, isFetching: false };
        }
        default: {
            return { ...state };
        }
    }
};
