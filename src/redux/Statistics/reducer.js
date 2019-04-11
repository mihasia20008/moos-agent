import * as types from './actionTypes';

const initialState = {
    fetchStatus: {
        periods: false,
        employee: false,
        company: false,
        widget: false,
    },
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
        case types.WIDGET_STATS_FETCH: {
            return {
                ...state,
                fetchStatus: Object.assign({}, state.fetchStatus, { widget: true }),
            };
        }
        case types.WIDGET_STATS_SUCCESS: {
            return {
                ...state,
                fetchStatus: Object.assign({}, state.fetchStatus, { widget: false }),
                widget: { ...state.widget, ...action.data },
            };
        }
        case types.WIDGET_STATS_ERROR: {
            return {
                ...state,
                fetchStatus: Object.assign({}, state.fetchStatus, { widget: false }),
            };
        }
        case types.PERIODS_LIST_FETCH: {
            return {
                ...state,
                fetchStatus: Object.assign({}, state.fetchStatus, { periods: true }),
            };
        }
        case types.PERIODS_LIST_SUCCESS: {
            return {
                ...state,
                fetchStatus: Object.assign({}, state.fetchStatus, { periods: false }),
                ...action.data,
            };
        }
        case types.PERIODS_LIST_ERROR: {
            return {
                ...state,
                fetchStatus: Object.assign({}, state.fetchStatus, { periods: false }),
            };
        }
        case types.EMPLOYEE_STATS_FETCH: {
            return {
                ...state,
                fetchStatus: Object.assign({}, state.fetchStatus, { employee: true }),
            };
        }
        case types.EMPLOYEE_STATS_SUCCESS: {
            return {
                ...state,
                fetchStatus: Object.assign({}, state.fetchStatus, { employee: false }),
                employee: { ...state.employee, ...action.data },
            };
        }
        case types.EMPLOYEE_STATS_ERROR: {
            return {
                ...state,
                fetchStatus: Object.assign({}, state.fetchStatus, { employee: false }),
            };
        }
        case types.COMPANY_STATS_FETCH: {
            return {
                ...state,
                fetchStatus: Object.assign({}, state.fetchStatus, { company: true }),
            };
        }
        case types.COMPANY_STATS_SUCCESS: {
            return {
                ...state,
                fetchStatus: Object.assign({}, state.fetchStatus, { company: false }),
                company: { ...state.company, ...action.data },
            };
        }
        case types.COMPANY_STATS_ERROR: {
            return {
                ...state,
                fetchStatus: Object.assign({}, state.fetchStatus, { company: false }),
            };
        }
        default: {
            return state;
        }
    }
};
