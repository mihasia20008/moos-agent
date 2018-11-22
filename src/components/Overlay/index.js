import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Overlay = ({ size }) => {
    return (
        <div className={cx('preloader', {
            [`preloader--${size}`]: size !== 'default'
        })}>
            <svg viewBox="-2000 -1000 4000 2000">
                <path id="inf" d="M354-354A500 500 0 1 1 354 354L-354-354A500 500 0 1 0-354 354z" />
                <use xlinkHref="#inf" strokeDasharray="1570 5143" strokeDashoffset="6713px" />
            </svg>
        </div>
    );
};

Overlay.propTypes = { size: PropTypes.string };
Overlay.defaultProps = { size: 'default' };

export default Overlay;
