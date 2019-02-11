import * as types from './actionTypes';

const initialState = {
  isFetching: false,
  isFetchingNext: false,
  company: [],
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
        company: action.data.company ? action.data.company : []
      };
    }
    case types.CLIENTS_ERROR: {
      return { ...state, isFetching: false };
    }
    case types.NEXT_CLIENTS_FETCH: {
      return { ...state, isFetchingNext: true };
    }
    case types.NEXT_CLIENTS_SUCCESS: {
      const { company } = action.data;
      return {
        ...state,
        isFetchingNext: false,
        ...action.data,
        company: state.company.concat(company),
      };
    }
    case types.NEXT_CLIENTS_ERROR: {
      return { ...state, isFetching: false };
    }
    default: {
      return { ...state };
    }
  }
};
