import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Overlay from '../../components/Overlay';

import cls from 'classnames/bind';
import s from './style.css';

const cx = cls.bind(s);

const Layout = ({ component: Component, isFetching, isNotFound, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
        <div className={cx('fr-app')}>
            <div className={cx('fr-container', {
                'fr-container--error': isNotFound,
            })}>
                <Component {...matchProps} />
                {isFetching && <Overlay />}
            </div>
        </div>
    )} />
  );
};

Layout.propTypes = {
  component: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  isNotFound: PropTypes.bool,
};

export default Layout;
