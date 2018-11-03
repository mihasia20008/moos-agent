import React from 'react';
import { Switch } from 'react-router-dom';

import Layout from './containers/Layout';
import NotFound from './pages/NotFound';

export default (
    <Switch>
        <Layout exact path="/" component={() => <div>Main</div>} />
        {/* <Layout path="/catalog/:name/" component={CatalogSectionPage} image="/assets/img/Catalog/bg-img.jpg" />
        <Layout path="/dealers/" component={DealersPage} image="/assets/img/Catalog/bg-img.jpg" />
        {/*<Layout path="/catalog/" component={CatalogSectionPage} />*/}
        {/*<Layout path="/products/:name/" component={DetailPage} image="/assets/img/Detail/bg-img.jpg" /> */}
        <Layout component={NotFound} isNotFound />
    </Switch>
);
