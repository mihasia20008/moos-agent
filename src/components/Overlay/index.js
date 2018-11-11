import React from 'react';
import cx from 'classnames';

const Overlay = ({ size }) => {
    return (
        <div className={cx('preloader', {
            [`preloader--${size}`]: typeof size !== 'undefined'
        })}>
            <svg viewBox="-2000 -1000 4000 2000">
                <path id="inf" d="M354-354A500 500 0 1 1 354 354L-354-354A500 500 0 1 0-354 354z" />
                <use xlinkHref="#inf" strokeDasharray="1570 5143" strokeDashoffset="6713px" />
            </svg>
        </div>
    );
};

export default Overlay;
