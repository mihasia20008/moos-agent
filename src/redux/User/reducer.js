import * as types from './actionTypes';

const initialState = {
  isFetching: false,
  list: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.USER_FETCH: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case types.USER_ERROR: {
            return {
                ...state,
                isFetching: false,
            };
        }
        default: {
            return { ...state };
        }
    }
}