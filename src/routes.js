import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {withKeycloak} from 'react-keycloak';

import LayoutBase from './containers/Layout';
import LoginBase from './pages/Login';
import Tasks from './pages/Tasks';
import Clients from './pages/Clients';
import Agents from './pages/Agents';
import NotFound from './pages/NotFound';

export default ({useKeycloak}) => {
  const Login = useKeycloak ? withKeycloak(LoginBase) : LoginBase;
  const Layout = useKeycloak ? withKeycloak(LayoutBase) : LayoutBase;

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Layout path="/tasks/:id" component={Tasks}/>
        <Layout path="/tasks" component={Tasks}/>
        <Layout path="/clients/:id" component={Clients}/>
        <Layout path="/clients" component={Clients}/>
        <Layout path="/agents/:agent/users/new" component={Agents}/>
        <Layout path="/agents/:agent/users/:user" component={Agents}/>
        <Layout path="/agents/:agent/users" component={Agents}/>
        <Layout path="/agents" component={Agents}/>
        <Layout component={NotFound} isNotFound/>
      </Switch>
    </Router>
  );
};
