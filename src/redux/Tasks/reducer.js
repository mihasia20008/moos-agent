import * as types from './actionTypes';

const initialState = {
  isFetching: false,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TASKS_FETCH: {
      return { ...state, isFetching: true };
    }
    case types.TASKS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        ...action.data,
      };
    }
    case types.TASKS_ERROR: {
      return { ...state, isFetching: false };
    }
    default: {
      return { ...state };
    }
  }
};
