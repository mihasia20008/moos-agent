import * as types from './actionTypes';

const initialState = {
    isFetching: false,
    widgetSum: null,
    widgetItems: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.WIDGET_STATS_FETCH: {
            return { ...state, isFetching: true };
        }
        case types.WIDGET_STATS_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                ...action.data,
            };
        }
        case types.WIDGET_STATS_ERROR: {
            return { ...state, isFetching: false };
        }
        default: {
            return { ...state };
        }
    }
};
