import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './containers/Layout';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

export default (
    <Switch>
        <Route exact path="/" component={Login} />
        {/* <Layout path="/catalog/:name/" component={CatalogSectionPage} image="/assets/img/Catalog/bg-img.jpg" />
        <Layout path="/dealers/" component={DealersPage} image="/assets/img/Catalog/bg-img.jpg" />
        {/*<Layout path="/catalog/" component={CatalogSectionPage} />*/}
        {/*<Layout path="/products/:name/" component={DetailPage} image="/assets/img/Detail/bg-img.jpg" /> */}
        <Layout component={NotFound} isNotFound />
    </Switch>
);
