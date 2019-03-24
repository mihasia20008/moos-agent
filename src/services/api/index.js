import axios from 'axios';
import {keycloak} from '../utility';

import * as Tasks from './tasks';
import * as User from './user';
import * as Clients from './clients';
import * as Client from './client';
import * as Agents from './agents/';
import * as Search from './search';
import * as Statistics from './statistics';

import {store} from '../../index';

axios.interceptors.request.use(async (config) => {
    try {
        await keycloak.updateToken(30);
        if (keycloak.authenticated) {
            console.log('keycloak', keycloak);
            config.headers.Authorization = 'Bearer ' + keycloak.token;
            return config;
        }
        const {User: {isAuth, session_id}} = store.getState();
        if (isAuth && session_id) {
            const {url} = config;
            const [location, params = ''] = url.split('?');
            let kvp = params.split('&');
            let i = kvp.length;
            let x;
            while (i--) {
                x = kvp[i].split('=');
                if (x[0] === 'session_id') {
                    x[1] = session_id;
                    kvp[i] = x.join('=');
                    break;
                }
            }

            if (i < 0) {
                kvp[kvp.length] = ['session_id', session_id].join('=');
            }
            config.url = [location, kvp.join('&')].join('?');
        }
        console.log(config);
        return config;
    } catch (err) {
        console.log(err);
        // keycloak.login();
    }
});


export {
    Tasks,
    User,
    Clients,
    Client,
    Agents,
    Search,
    Statistics,
};
