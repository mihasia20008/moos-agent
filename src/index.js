import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { KeycloakProvider } from 'react-keycloak';
import { keycloak } from './services/utility';

import './static/scss/style.scss';

import routes from './routes.js';
import configureStore from './redux/configureStore';

export const store = configureStore();

render(
    <KeycloakProvider keycloak={keycloak}>
        <Provider store={store}>
            <Router>
                {routes}
            </Router>
        </Provider>
    </KeycloakProvider>,
    document.getElementById('root')
);
