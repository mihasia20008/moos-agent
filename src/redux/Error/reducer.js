import * as types from './actionTypes';

const initialState = {
    text: '',
    show: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.ERROR_SHOW: {
            return {
                text: action.message,
                show: true,
            };
        }
        case types.ERROR_HIDE: {
            return { ...initialState };
        }
        default: {
            return state;
        }
    }
};
