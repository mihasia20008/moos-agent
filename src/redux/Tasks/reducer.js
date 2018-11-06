import * as types from './actionTypes';

const initialState = {
  isFetching: false,
  isFetchingNext: false,
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
    case types.NEXT_TASKS_FETCH: {
      return { ...state, isFetchingNext: true };
    }
    case types.NEXT_TASKS_SUCCESS: {
      return {
        ...state,
        isFetchingNext: false,
        list: state.list.concat(action.data.list),
      };
    }
    case types.NEXT_TASKS_ERROR: {
      return { ...state, isFetching: false };
    }
    default: {
      return { ...state };
    }
  }
};
