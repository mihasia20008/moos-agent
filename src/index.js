import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './static/scss/style.scss';

import routes from './routes.js';
import configureStore from './redux/configureStore';

const store = configureStore();

render(
    <Provider store={store}>
        <Router>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('root')
);
