import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Cookies from "js-cookie";

import { KeycloakProvider } from 'react-keycloak';
import { keycloak } from './services/utility';

import './static/scss/style.scss';

import Overlay from './components/Overlay';

import routes from './routes.js';
import configureStore from './redux/configureStore';

export const store = configureStore();

class App extends PureComponent {
    handleKeycloakError = (...arg) => {
        console.log(arg);
    };

    handleKeycloakToken = (token) => Cookies.set('JWT', token);

    renderApp = () => {
        return (
            <Provider store={store}>
                <Router>
                    {routes}
                </Router>
            </Provider>
        );
    };

    render() {
        const { authType } = store.getState().User;

        if (authType === 'standard') {
            return this.renderApp();
        }

        if (authType === 'keycloak') {
            return (
                <KeycloakProvider
                    keycloak={keycloak}
                    initConfig={{ onLoad: "login-required" }}
                    onError={this.handleKeycloakError}
                    onToken={this.handleKeycloakToken}
                >
                    {this.renderApp()}
                </KeycloakProvider>
            );
        }

        return <Overlay size="big" />;
    }
}

render(
    <App />,
    document.getElementById('root')
);
