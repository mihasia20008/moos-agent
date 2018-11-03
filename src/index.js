import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './static/scss/style.scss';

import routes from './routes.js';

render(
    <Router>
        {routes}
    </Router>,
    document.getElementById('root')
);
