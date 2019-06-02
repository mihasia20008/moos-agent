import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import * as rootReducer from './rootReducer';

function configureStore() {
    let middlewares = [
        thunk,
    ];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    const globalReducer = combineReducers(rootReducer);

    middlewares = applyMiddleware(...middlewares);

    /* eslint-disable no-underscore-dangle */
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
            : compose;
    /* eslint-enable */

    if (process.env.NODE_ENV !== 'production') {
        middlewares = composeEnhancers(middlewares);
    }

    const store = createStore(
        globalReducer,
        middlewares,
    );

    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('./rootReducer', () => {
                store.replaceReducer(require('./rootReducer'));
            });
        }
    }

    return store;
}

export default configureStore();
