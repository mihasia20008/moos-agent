import * as types from './actionTypes';

const initialState = {
  isFetching: false,
  isFetchingNext: false,
  filters: {},
  order: [],
  tasks: {},
  page: 0,
  more: false,
  amount_min: 1000000,
  amount_max: 15000000,
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
      const { order, tasks } = action.data;
      return {
        ...state,
        isFetchingNext: false,
        ...action.data,
        order: state.order.concat(order),
        tasks: Object.assign(state.tasks, tasks),
      };
    }
    case types.NEXT_TASKS_ERROR: {
      return { ...state, isFetching: false };
    }
    case types.TASKS_SET_FILTER: {
      const { filters } = action.data;
      return {
          ...state,
          filters: Object.assign({}, state.filters, filters),
      }
    }
    default: {
      return { ...state };
    }
  }
};
