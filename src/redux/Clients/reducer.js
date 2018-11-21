import * as types from './actionTypes';

const initialState = {
  isFetching: false,
  isFetchingNext: false,
  list: {},
  idsList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CLIENTS_FETCH: {
      return { ...state, isFetching: true };
    }
    case types.CLIENTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        ...action.data,
      };
    }
    case types.CLIENTS_ERROR: {
      return { ...state, isFetching: false };
    }
    default: {
      return { ...state };
    }
  }
};
