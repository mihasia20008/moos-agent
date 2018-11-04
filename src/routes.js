import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './containers/Layout';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import NotFound from './pages/NotFound';

export default (
    <Switch>
        <Route exact path="/" component={Login} />
        <Layout path="/tasks" component={Tasks} />
        <Layout component={NotFound} isNotFound />
    </Switch>
);
