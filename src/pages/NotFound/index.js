import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import CONTENT from '../../contentConstants';

const NotFound = () => {
    return [
        <Link key={0} className={cx('logo')} to="/">
            <img className={cx('logo__img')} src="static/media/logo-min.svg" alt="logo" />
        </Link>,
        <div key={1} className={cx('error-message')}>
            <p className={cx('error-message__title')}>Ошибка 404: страница не найдена</p>
            <Link className={cx('btn btn-secondary error-message__btn')} to="/">
                На главную
            </Link>
            <span className={cx('error-message__text')}>
                Поддержка: 
                <a 
                    className={cx('error-message__phone')} 
                    href={`tel:${CONTENT.PHONE.replace(/\+|\s|\(|\)|–|-/g, '')}`}
                >
                    {CONTENT.PHONE}
                </a>
            </span>
        </div>
    ];
};

export default NotFound;
