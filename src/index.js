import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './style.css';

import routes from './routes.js';

render(
    <Router>
        {routes}
    </Router>,
    document.getElementById('root')
);
