import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './containers/Layout';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Clients from './pages/Clients';
import Agents from './pages/Agents';
import NotFound from './pages/NotFound';

export default (
    <Switch>
        <Route exact path="/" component={Login} />
        <Layout path="/tasks/:id" component={Tasks} />
        <Layout path="/tasks" component={Tasks} />
        <Layout path="/clients/:id" component={Clients} />
        <Layout path="/clients" component={Clients} />
        <Layout path="/agents/:agent/users/new" component={Agents} />
        <Layout path="/agents/:agent/users" component={Agents} />
        <Layout path="/agents" component={Agents} />
        <Layout component={NotFound} isNotFound />
    </Switch>
);
